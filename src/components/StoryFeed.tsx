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

    useEffect(() => {
        const translateAll = async () => {
            const newTranslations: Record<string, string> = {}
            for (const story of stories) {
                if (targetLang !== 'en') {
                    // In production, you would cache this or batch requests
                    const translated = await translateText(story.content, targetLang)
                    newTranslations[story.id] = translated
                }
            }
            setTranslatedStories(newTranslations)
        }

        if (stories.length > 0 && targetLang !== 'en') {
            translateAll()
        } else {
            setTranslatedStories({})
        }
    }, [stories, targetLang])

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
