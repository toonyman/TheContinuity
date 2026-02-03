import Modal from './Modal'
import { TRANSLATIONS } from '@/lib/translations'

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: string;
}

export default function AboutModal({ isOpen, onClose, lang }: AboutModalProps) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['en']
    const a = t.about

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={a.title}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p dangerouslySetInnerHTML={{ __html: a.intro }} />

                <h3>{a.visionTitle}</h3>
                <p>
                    {a.visionDesc}
                </p>

                <h3>{a.featuresTitle}</h3>
                <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                    {a.features.map((feature: string, i: number) => (
                        <li key={i}>{feature}</li>
                    ))}
                </ul>

                <p
                    style={{ opacity: 0.7, fontSize: '0.9rem', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}
                    dangerouslySetInnerHTML={{ __html: a.footer }}
                />
            </div>
        </Modal>
    )
}
