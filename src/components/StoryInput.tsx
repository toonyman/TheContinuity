'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './StoryInput.module.css'

export default function StoryInput({ onStoryAdded }: { onStoryAdded: () => void }) {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [cooldown, setCooldown] = useState(0)

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

    return (
        <div className={`glass-panel ${styles.container}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputWrapper}>
                    <textarea
                        className={styles.textarea}
                        value={content}
                        onChange={(e) => setContent(e.target.value.slice(0, 100))}
                        placeholder={cooldown > 0 ? `Please wait ${Math.floor(cooldown / 60)}:${(cooldown % 60).toString().padStart(2, '0')} to contribute again.` : "Write the next sentence..."}
                        disabled={loading || cooldown > 0}
                        maxLength={100}
                    />
                    <span className={styles.counter}>{content.length}/100</span>
                </div>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading || !content.trim() || cooldown > 0}
                >
                    {loading ? 'Posting...' : cooldown > 0 ? 'Cooldown' : 'Contribute'}
                </button>
            </form>
        </div>
    )
}
