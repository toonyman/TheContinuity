'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Story } from '@/types'
import styles from './StoryFeed.module.css'
import { translateText } from '@/lib/translate'

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

    async function handleReaction(storyId: string, type: 'like' | 'dislike') {
        const story = stories.find(s => s.id === storyId)
        if (!story) return

        // Ideally we should track user votes to prevent duplicate voting (using localStorage for simplicity)
        const voteKey = `vote_${storyId}`
        const currentVote = localStorage.getItem(voteKey)

        if (currentVote === type) {
            return
        }

        // Optimistic update
        setStories(prev => prev.map(s => {
            if (s.id === storyId) {
                return {
                    ...s,
                    likes: type === 'like' ? (s.likes || 0) + 1 : (s.likes || 0),
                    dislikes: type === 'dislike' ? (s.dislikes || 0) + 1 : (s.dislikes || 0)
                }
            }
            return s
        }))

        localStorage.setItem(voteKey, type)

        const { error } = await supabase
            .from('stories')
            .update({
                [type === 'like' ? 'likes' : 'dislikes']: (type === 'like' ? (story.likes || 0) : (story.dislikes || 0)) + 1
            })
            .eq('id', storyId)

        if (error) {
            console.error('Error updating reaction:', error)
        }
    }

    return (
        <div className={styles.feedWrapper}>
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
                                    className={styles.reactionBtn}
                                    title="Like"
                                >
                                    <span>👍</span>
                                    <span className={styles.reactionCount}>{story.likes || 0}</span>
                                </button>
                                <button
                                    onClick={() => handleReaction(story.id, 'dislike')}
                                    className={styles.reactionBtn}
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
