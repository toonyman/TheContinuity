import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './StoryInput.module.css'
import { TRANSLATIONS } from '@/lib/translations'

interface StoryInputProps {
    onStoryAdded: () => void;
    lang: string;
}

export default function StoryInput({ onStoryAdded, lang }: StoryInputProps) {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [cooldown, setCooldown] = useState(0)

    const t = TRANSLATIONS[lang] || TRANSLATIONS['en']

    useEffect(() => {
        // Check for existing cooldown on mount
        const lastPosted = localStorage.getItem('lastPosted')
        if (lastPosted) {
            const timePassed = Date.now() - parseInt(lastPosted)
            const remaining = Math.max(0, 300000 - timePassed) // 5 minutes = 300000ms
            setCooldown(Math.ceil(remaining / 1000))
        }
    }, [])

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setInterval(() => {
                setCooldown((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [cooldown])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim() || loading || cooldown > 0) return

        setLoading(true)

        const { error } = await supabase
            .from('stories')
            .insert([{ content: content.trim() }])

        if (error) {
            console.error('Error posting story:', error)
            alert('Failed to post story. Please try again.')
        } else {
            setContent('')
            const now = Date.now()
            localStorage.setItem('lastPosted', now.toString())
            setCooldown(300) // 300 seconds = 5 minutes
            onStoryAdded()
        }
        setLoading(false)
    }

    const formatTime = (seconds: number) => {
        return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
    }

    const getPlaceholder = () => {
        if (cooldown > 0) {
            return t.input.placeholderCooldown.replace('{time}', formatTime(cooldown))
        }
        return t.input.placeholder
    }

    return (
        <div className={`glass-panel ${styles.container}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputWrapper}>
                    <textarea
                        className={styles.textarea}
                        value={content}
                        onChange={(e) => setContent(e.target.value.slice(0, 100))}
                        placeholder={getPlaceholder()}
                        disabled={loading || cooldown > 0}
                        maxLength={100}
                    />
                    <span className={styles.counter}>{t.input.charCount.replace('{current}', content.length)}</span>
                </div>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading || !content.trim() || cooldown > 0}
                >
                    {loading ? t.input.buttonPosting : cooldown > 0 ? t.input.buttonCooldown : t.input.buttonContribute}
                </button>
            </form>
        </div>
    )
}
