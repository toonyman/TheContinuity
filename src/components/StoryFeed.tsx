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
        let isCancelled = false;

        const translateMissing = async () => {
            // Find stories that haven't been translated yet
            const missingStories = stories.filter(
                (s) => !translatedStories[s.id] && s.content
            )

            if (missingStories.length === 0) return

            // Process sequentially to avoid API rate limits (MyMemory free tier)
            for (const story of missingStories) {
                if (isCancelled) break;

                // Simple check to skip if source == target (handled in lib but good optimization)
                if (targetLang === 'en' && /^[A-Za-z0-9\s.,?!'"]+$/.test(story.content)) {
                    // Optimized update for English content when target is English
                    setTranslatedStories(prev => ({ ...prev, [story.id]: story.content }));
                    continue;
                }

                try {
                    const translated = await translateText(story.content, targetLang);

                    if (isCancelled) break;

                    setTranslatedStories(prev => ({
                        ...prev,
                        [story.id]: translated
                    }));

                    // Add delay between requests to be gentle on the API
                    await new Promise(resolve => setTimeout(resolve, 300));
                } catch (e) {
                    console.error(`Failed to translate story ${story.id}`, e);
                }
            }
        }

        translateMissing()

        return () => {
            isCancelled = true;
        }
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
