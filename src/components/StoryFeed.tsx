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
    }, [targetLang])

    // Incrementally fetch translations for new stories
    useEffect(() => {
        const translateMissing = async () => {
            // Removed targetLang === 'en' check to allow translation from other languages TO English.
            // translateText handles skipping if source == target.

            const missingStories = stories.filter(
                (s) => !translatedStories[s.id] && s.content
            )


            if (missingStories.length === 0) return

            // Optimize: Promise.all for parallel fetching
            const results = await Promise.all(
                missingStories.map(async (story) => {
                    const translated = await translateText(story.content, targetLang)
                    return { id: story.id, text: translated }
                })
            )

            setTranslatedStories((prev) => {
                const next = { ...prev }
                results.forEach((r) => {
                    next[r.id] = r.text
                })
                return next
            })
        }

        translateMissing()
    }, [stories, targetLang, translatedStories])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [stories, translatedStories])

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
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    )
}
