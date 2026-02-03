import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './StoryInput.module.css'
import { TRANSLATIONS } from '@/lib/translations'

import { checkContentSafety } from '@/lib/contentSafety'

interface StoryInputProps {
    onStoryAdded: () => void;
    lang: string;
}

export default function StoryInput({ onStoryAdded, lang }: StoryInputProps) {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const t = TRANSLATIONS[lang] || TRANSLATIONS['en']

    useEffect(() => {
        // Auto-expand textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [content])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim() || loading) return

        // Content Safety Check
        const safetyCheck = checkContentSafety(content)
        if (!safetyCheck.safe) {
            let errorMessage = t.errors?.safety?.default || "Content cannot be posted."
            if (safetyCheck.reason === 'url') {
                errorMessage = t.errors?.safety?.url || errorMessage
            } else if (safetyCheck.reason === 'bad_word') {
                errorMessage = t.errors?.safety?.badWord || errorMessage
            }
            alert(errorMessage)
            return
        }

        setLoading(true)

        const { error } = await supabase
            .from('stories')
            .insert([{ content: content.trim() }])

        if (error) {
            console.error('Error posting story:', error)
            alert('Failed to post story. Please try again.')
        } else {
            setContent('')
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
            onStoryAdded()
        }
        setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value
        // Strict 100 character limit
        if (val.length <= 100) {
            setContent(val)
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputWrapper}>
                    <textarea
                        ref={textareaRef}
                        className={styles.textarea}
                        value={content}
                        onChange={handleChange}
                        placeholder={t.input.placeholder}
                        disabled={loading}
                        rows={1}
                        spellCheck={false}
                    />
                </div>
                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading || !content.trim()}
                    aria-label={t.input.buttonContribute}
                >
                    {loading ? (
                        <div className="spinner-small" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></div>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    )}
                </button>
            </form>
            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
