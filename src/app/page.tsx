'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import StoryFeed from '@/components/StoryFeed'
import StoryInput from '@/components/StoryInput'
import GuideModal from '@/components/GuideModal'
import AboutModal from '@/components/AboutModal'
import { LANGUAGES } from '@/lib/translate'
import { TRANSLATIONS } from '@/lib/translations'

export default function Home() {
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [targetLang, setTargetLang] = useState('en')
    const [showGuide, setShowGuide] = useState(false)
    const [showAbout, setShowAbout] = useState(false)

    useEffect(() => {
        const visited = localStorage.getItem('hasVisited')
        if (!visited) {
            setShowGuide(true)
            localStorage.setItem('hasVisited', 'true')
        }
    }, [])

    const t = TRANSLATIONS[targetLang] || TRANSLATIONS['en']

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.headerLeft}></div> {/* Spacer for centering */}
                <div className={styles.headerTitle}>
                    <h1 className={styles.title}>The Continuity</h1>
                    <p className={styles.subtitle}>{t.subtitle}</p>
                </div>
                <div className={styles.headerControls}>
                    <select
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                        className={styles.langSelect}
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code} className={styles.langOption}>{lang.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => setShowGuide(true)}
                        className={styles.iconBtn}
                        aria-label={t.header.howToUse}
                        title={t.header.howToUse}
                    >
                        ?
                    </button>
                    <button
                        onClick={() => setShowAbout(true)}
                        className={styles.iconBtn}
                        aria-label={t.header.about}
                        title={t.header.about}
                    >
                        i
                    </button>
                </div>
            </header>

            <GuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} lang={targetLang} />
            <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} lang={targetLang} />

            <div className={styles.contentWrapper}>
                {/* Left: Feed */}
                <section className={styles.feedSection}>
                    <div className={styles.scrollArea}>
                        <StoryFeed refreshTrigger={refreshTrigger} targetLang={targetLang} />
                    </div>
                </section>

                {/* Right: Input */}
                <section className={styles.inputSection}>

                    <StoryInput onStoryAdded={() => setRefreshTrigger(prev => prev + 1)} lang={targetLang} />
                </section>
            </div>
        </main>
    )
}
