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

                                <div className={styles.menuItem}>
                                    <label>Share</label>
                                    <div className={styles.shareGrid}>
                                        <button
                                            onClick={() => {
                                                const url = window.location.origin
                                                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
                                            }}
                                            className={styles.shareBtn}
                                            aria-label="Share on Meta"
                                        >
                                            <svg viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.16L15.72 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z" /></svg>
                                        </button>
                                        <button
                                            onClick={() => {
                                                const url = window.location.origin
                                                const text = `The Continuity: A Global Collaborative Novel`
                                                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
                                            }}
                                            className={styles.shareBtn}
                                            aria-label="Share on X"
                                        >
                                            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                        </button>
                                        <button
                                            onClick={() => {
                                                const url = window.location.origin
                                                const title = `The Continuity: A Global Collaborative Novel`
                                                window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank')
                                            }}
                                            className={styles.shareBtn}
                                            aria-label="Share on Reddit"
                                        >
                                            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.62 13.23c-.56.56-1.34.87-2.18.87h-.88c-.84 0-1.62-.31-2.18-.87-.29-.29-.29-.77 0-1.06.29-.29.77-.29 1.06 0 .28.28.67.44 1.12.44h.88c.45 0 .84-.16 1.12-.44.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06zM9.44 11.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm6.37 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" /></svg>
                                        </button>
                                        <button
                                            onClick={() => {
                                                const url = window.location.origin
                                                navigator.clipboard.writeText(url)
                                                alert('URL Copied!')
                                            }}
                                            className={styles.shareBtn}
                                            aria-label="Copy URL"
                                        >
                                            <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
                                        </button>
                                    </div>
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
