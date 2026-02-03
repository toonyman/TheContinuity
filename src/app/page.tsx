'use client'

import { useState } from 'react'
import styles from './page.module.css'
import StoryFeed from '@/components/StoryFeed'
import StoryInput from '@/components/StoryInput'

export default function Home() {
    const [refreshTrigger, setRefreshTrigger] = useState(0)

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
                        <StoryFeed refreshTrigger={refreshTrigger} />
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
