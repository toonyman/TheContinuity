'use client'

import { useEffect, useState } from 'react'
import styles from './ReaderModal.module.css'

interface ReaderModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}

export default function ReaderModal({ isOpen, onClose, content }: ReaderModalProps) {
    const [isVisible, setIsVisible] = useState(false)

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

    if (!isVisible && !isOpen) return null

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.modal} ${isOpen ? styles.open : ''}`} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Reader Mode</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.contentScroll}>
                    <div className={styles.paper}>
                        <p className={styles.text}>
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
