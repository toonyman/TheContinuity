'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Story } from '@/types'
import styles from './StoryFeed.module.css'
import { translateText } from '@/lib/translate'
import ReaderModal from './ReaderModal'

interface StoryFeedProps {
    refreshTrigger: number;
    targetLang: string;
}

export default function StoryFeed({ refreshTrigger, targetLang }: StoryFeedProps) {
    const [stories, setStories] = useState<Story[]>([])
    const bottomRef = useRef<HTMLDivElement>(null)
    const [translatedStories, setTranslatedStories] = useState<Record<string, string>>({})
    // Track translated stories to safely check status without adding state dependency
    const translatedIds = useRef<Set<string>>(new Set())
    const [isReaderOpen, setIsReaderOpen] = useState(false)

    const fetchStories = async () => {
        const { data, error } = await supabase
            .from('stories')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) {
            console.error('Error fetching stories:', error)
        } else {
            setStories(data || [])
        }
    }

    useEffect(() => {
        fetchStories()

        const channel = supabase
            .channel('public:stories')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'stories' }, (payload) => {
                setStories((prev) => [...prev, payload.new as Story])
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    useEffect(() => {
        fetchStories()
    }, [refreshTrigger])

    // Clear translations when target language changes
    useEffect(() => {
        setTranslatedStories({})
        translatedIds.current.clear()
    }, [targetLang])

    // Incrementally fetch translations for new stories
    useEffect(() => {
        let isCancelled = false

        const translateMissing = async () => {
            // Find stories that haven't been translated yet using Ref check
            const missingStories = stories.filter(
                (s) => !translatedIds.current.has(s.id) && s.content
            )

            if (missingStories.length === 0) return

            // Mark as processing immediately to prevent duplicate runs
            missingStories.forEach(s => translatedIds.current.add(s.id))

            // Process newest stories first (since user is likely at the bottom)
            const storiesToTranslate = [...missingStories].reverse()

            // Process sequentially to avoid API rate limits
            for (const story of storiesToTranslate) {
                if (isCancelled) break

                // Optimistic check for English to English
                if (targetLang === 'en' && /^[A-Za-z0-9\s.,?!'"]+$/.test(story.content)) {
                    setTranslatedStories(prev => ({ ...prev, [story.id]: story.content }))
                    continue
                }

                try {
                    const translated = await translateText(story.content, targetLang)

                    if (isCancelled) break

                    setTranslatedStories(prev => ({
                        ...prev,
                        [story.id]: translated
                    }))

                    // Gentle delay for API
                    await new Promise(resolve => setTimeout(resolve, 300))
                } catch (e) {
                    console.error(`Failed to translate story ${story.id}`, e)
                }
            }
        }

        translateMissing()

        return () => {
            isCancelled = true
        }
    }, [stories, targetLang])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [stories, translatedStories])

    const [userVotes, setUserVotes] = useState<Record<string, 'like' | 'dislike'>>({})

    useEffect(() => {
        // Hydrate votes from localStorage
        const votes: Record<string, 'like' | 'dislike'> = {}
        if (stories.length > 0) {
            stories.forEach(story => {
                const vote = localStorage.getItem(`vote_${story.id}`) as 'like' | 'dislike' | null
                if (vote) {
                    votes[story.id] = vote
                }
            })
            setUserVotes(votes)
        }
    }, [stories])

    async function handleReaction(storyId: string, type: 'like' | 'dislike') {
        const story = stories.find(s => s.id === storyId)
        if (!story) return

        const currentVote = userVotes[storyId]
        let newLikes = story.likes || 0
        let newDislikes = story.dislikes || 0

        // Determine new state and update counts
        if (currentVote === type) {
            // Toggle off
            if (type === 'like') newLikes = Math.max(0, newLikes - 1)
            else newDislikes = Math.max(0, newDislikes - 1)

            localStorage.removeItem(`vote_${storyId}`)
            const newVotes = { ...userVotes }
            delete newVotes[storyId]
            setUserVotes(newVotes)
        } else {
            // New vote or switch vote
            if (currentVote) {
                // Remove previous vote count
                if (currentVote === 'like') newLikes = Math.max(0, newLikes - 1)
                else newDislikes = Math.max(0, newDislikes - 1)
            }

            // Add new vote count
            if (type === 'like') newLikes++
            else newDislikes++

            localStorage.setItem(`vote_${storyId}`, type)
            setUserVotes(prev => ({ ...prev, [storyId]: type }))
        }

        // Optimistic UI Update
        setStories(prev => prev.map(s => {
            if (s.id === storyId) {
                return {
                    ...s,
                    likes: newLikes,
                    dislikes: newDislikes
                }
            }
            return s
        }))

        const { error } = await supabase
            .from('stories')
            .update({
                likes: newLikes,
                dislikes: newDislikes
            })
            .eq('id', storyId)

        if (error) {
            console.error('Error updating reaction:', error)
        }
    }

    return (
        <div className={styles.feedWrapper}>
            <div className={styles.controls}>
                <button
                    className={styles.readerBtn}
                    onClick={() => setIsReaderOpen(true)}
                    title="Reader View"
                >
                    <span style={{ fontSize: '1.2rem' }}>📖</span>
                </button>
            </div>

            <ReaderModal
                isOpen={isReaderOpen}
                onClose={() => setIsReaderOpen(false)}
                content={stories.map(s => translatedStories[s.id] || s.content).join('\n\n')}
            />

            <div className={styles.feed}>
                {stories.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>The story has not begun yet. Be the first.</p>
                    </div>
                ) : (
                    stories.map((story) => (
                        <div key={story.id} className={`${styles.storyNode} animate-fade-in`}>
                            <p className={styles.content}>
                                {translatedStories[story.id] || story.content}
                            </p>
                            <div className={styles.reactionContainer}>
                                <button
                                    onClick={() => handleReaction(story.id, 'like')}
                                    className={`${styles.reactionBtn} ${userVotes[story.id] === 'like' ? styles.active : ''}`}
                                    title="Like"
                                >
                                    <span>👍</span>
                                    <span className={styles.reactionCount}>{story.likes || 0}</span>
                                </button>
                                <button
                                    onClick={() => handleReaction(story.id, 'dislike')}
                                    className={`${styles.reactionBtn} ${userVotes[story.id] === 'dislike' ? styles.active : ''}`}
                                    title="Dislike"
                                >
                                    <span>👎</span>
                                    <span className={styles.reactionCount}>{story.dislikes || 0}</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    )
}
