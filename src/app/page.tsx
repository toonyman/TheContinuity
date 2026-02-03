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
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                <div className={styles.headerLeft}></div>
                <div className={styles.headerTitle}>
                    <h1 className={styles.title}>The Continuity</h1>
                    <p className={styles.subtitle}>{t.subtitle}</p>
                </div>
                <div className={styles.headerControls}>
                    <button
                        className={styles.hamburgerBtn}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <span className={`${styles.hamburgerIcon} ${isMenuOpen ? styles.open : ''}`}></span>
                    </button>

                    {isMenuOpen && (
                        <div className={styles.menuDrawer}>
                            <button className={styles.closeMenuBtn} onClick={() => setIsMenuOpen(false)} aria-label="Close menu">&times;</button>
                            <div className={styles.menuContent}>
                                <div className={styles.menuItem}>
                                    <label>Language</label>
                                    <select
                                        value={targetLang}
                                        onChange={(e) => {
                                            setTargetLang(e.target.value)
                                            setIsMenuOpen(false)
                                        }}
                                        className={styles.langSelect}
                                    >
                                        {LANGUAGES.map(lang => (
                                            <option key={lang.code} value={lang.code} className={styles.langOption}>{lang.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowGuide(true)
                                        setIsMenuOpen(false)
                                    }}
                                    className={styles.menuBtn}
                                >
                                    {t.header.howToUse}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAbout(true)
                                        setIsMenuOpen(false)
                                    }}
                                    className={styles.menuBtn}
                                >
                                    {t.header.about}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <GuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} lang={targetLang} />
            <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} lang={targetLang} />

            <div className={styles.contentWrapper}>
                <section className={styles.feedSection}>
                    <div className={styles.scrollArea}>
                        <div className={styles.feedContainer}>
                            <StoryFeed refreshTrigger={refreshTrigger} targetLang={targetLang} />
                            {/* Spacer to prevent input overlay on last item */}
                            <div className={styles.feedBottomSpacer}></div>
                        </div>
                    </div>
                </section>
            </div>

            <footer className={styles.inputContainer}>
                <StoryInput onStoryAdded={() => setRefreshTrigger(prev => prev + 1)} lang={targetLang} />
            </footer>
        </main>
    )
}
