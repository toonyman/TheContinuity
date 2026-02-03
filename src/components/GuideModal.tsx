import Modal from './Modal'

interface GuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="How to Participate">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>Welcome to <strong>The Continuity</strong>, a global collaborative novel written by people from all over the world.</p>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#f1c40f' }}>1. Read</h3>
                    <p style={{ margin: 0 }}>Scroll through the feed to read the story so far. It flows continuously.</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#f1c40f' }}>2. Translate</h3>
                    <p style={{ margin: 0 }}>Use the language selector at the top-left of the feed to read in your preferred language.</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#f1c40f' }}>3. Write</h3>
                    <p style={{ margin: 0 }}>Add the next sentence to the story. Keep it under 100 characters. You can write in your native language!</p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#f1c40f' }}>4. Cooldown</h3>
                    <p style={{ margin: 0 }}>To give everyone a chance, you must wait 5 minutes between contributions.</p>
                </div>

                <button
                    onClick={onClose}
                    className="btn-primary"
                    style={{ marginTop: '1rem' }}
                >
                    Start Writing
                </button>
            </div>
        </Modal>
    )
}
