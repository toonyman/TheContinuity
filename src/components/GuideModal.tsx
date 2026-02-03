import Modal from './Modal'
import { TRANSLATIONS } from '@/lib/translations'

interface GuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: string;
}

export default function GuideModal({ isOpen, onClose, lang }: GuideModalProps) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['en']
    const g = t.guide

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={g.title}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p dangerouslySetInnerHTML={{ __html: g.intro }} />

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#f1c40f' }}>{g.step1Title}</h3>
                    <p style={{ margin: 0 }}>{g.step1Desc}</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#f1c40f' }}>{g.step2Title}</h3>
                    <p style={{ margin: 0 }}>{g.step2Desc}</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#f1c40f' }}>{g.step3Title}</h3>
                    <p style={{ margin: 0 }}>{g.step3Desc}</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#f1c40f' }}>{g.step4Title}</h3>
                    <p style={{ margin: 0 }}>{g.step4Desc}</p>
                </div>

                <button
                    onClick={onClose}
                    className="btn-primary"
                    style={{ marginTop: '1rem' }}
                >
                    {g.button}
                </button>
            </div>
        </Modal>
    )
}
