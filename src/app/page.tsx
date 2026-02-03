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
                {/* Left: Feed */}
                <section className={styles.feedSection}>
                    <div className={styles.feedHeader}>
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
                    <div className={styles.scrollArea}>
                        <StoryFeed refreshTrigger={refreshTrigger} targetLang={targetLang} />
                    </div>
                </section>

                {/* Right: Input */}
                <section className={styles.inputSection}>

                    <StoryInput onStoryAdded={() => setRefreshTrigger(prev => prev + 1)} />
                </section>
            </div>
        </main>
    )
}
