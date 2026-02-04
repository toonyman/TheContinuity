import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './OnlineCount.module.css'
import { TRANSLATIONS } from '@/lib/translations'

interface OnlineCountProps {
    lang: string;
}

export default function OnlineCount({ lang }: OnlineCountProps) {
    const [count, setCount] = useState(1)

    useEffect(() => {
        const channel = supabase.channel('online_users', {
            config: {
                presence: {
                    key: Math.random().toString(36).substring(7), // Random session ID
                },
            },
        })

        channel
            .on('presence', { event: 'sync' }, () => {
                const newState = channel.presenceState()
                // Each key in presenceState represents a user session
                const userCount = Object.keys(newState).length
                setCount(userCount)
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({ online_at: new Date().toISOString() })
                }
            })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const t = TRANSLATIONS[lang] || TRANSLATIONS['en']
    const label = t.header.online.replace('{count}', count.toLocaleString())

    return (
        <div className={styles.container}>
            <span className={styles.indicator}></span>
            <span className={styles.text}>{label}</span>
        </div>
    )
}
