'use client'

import { useState } from 'react'
import styles from './page.module.css'
import StoryFeed from '@/components/StoryFeed'
import StoryInput from '@/components/StoryInput'
import { LANGUAGES } from '@/lib/translate'

export default function Home() {
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [targetLang, setTargetLang] = useState('en')

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.title}>The Continuity</h1>
                <p className={styles.subtitle}>A Global Collaborative Novel</p>
            </header>

            <div className={styles.contentWrapper}>
                {/* Left: Feed */}
                <section className={styles.feedSection}>
                    <div className={styles.scrollArea}>
                        <StoryFeed refreshTrigger={refreshTrigger} targetLang={targetLang} />
                    </div>
                </section>

                {/* Right: Input */}
                <section className={styles.inputSection}>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <p style={{ marginBottom: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>Translate Stories</p>
                        <select
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value)}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid var(--border)',
                                color: 'var(--foreground)',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                outline: 'none'
                            }}
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code} style={{ color: 'black' }}>{lang.name}</option>
                            ))}
                        </select>
                    </div>

                    <StoryInput onStoryAdded={() => setRefreshTrigger(prev => prev + 1)} />
                </section>
            </div>
        </main>
    )
}
