'use client'

import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './ReaderModal.module.css'

interface ReaderModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}

export default function ReaderModal({ isOpen, onClose, content }: ReaderModalProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [copied, setCopied] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            document.body.style.overflow = 'hidden'
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300)
            document.body.style.overflow = 'unset'
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    const handleCopy = () => {
        navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (!mounted) return null
    if (!isVisible && !isOpen) return null

    return createPortal(
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.modal} ${isOpen ? styles.open : ''}`} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Reader Mode</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.contentScroll}>
                    <div className={styles.paper}>
                        <div className={styles.copyContainer}>
                            <button
                                className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                                onClick={handleCopy}
                                title={copied ? 'Copied!' : 'Copy All'}
                            >
                                {copied ? (
                                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                                ) : (
                                    <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
                                )}
                            </button>
                        </div>
                        <p className={styles.text}>
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}
