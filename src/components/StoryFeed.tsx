'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Story } from '@/types'
import { translateText, LANGUAGES } from '@/lib/translate'
import styles from './StoryFeed.module.css'

export default function StoryFeed({ refreshTrigger }: { refreshTrigger: number }) {
    const [stories, setStories] = useState<Story[]>([])
    const [targetLang, setTargetLang] = useState('en')
    const [translatedStories, setTranslatedStories] = useState<Record<string, string>>({})
    const bottomRef = useRef<HTMLDivElement>(null)

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
            if (targetLang === 'en') return

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
            <div className={styles.controls}>
                <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className={styles.langSelect}
                >
                    {LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                </select>
            </div>

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
                            {translatedStories[story.id] && (
                                <span className={styles.originalText}>{story.content}</span>
                            )}
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    )
}
