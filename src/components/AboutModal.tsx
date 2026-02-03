import Modal from './Modal'

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="About The Continuity">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                    <strong>The Continuity</strong> is an experimental project in collective storytelling.
                    It removes language barriers, allowing imagination to flow freely across borders.
                </p>

                <h3>Our Vision</h3>
                <p>
                    We believe that a story written by thousands of people can be more surprising and profound than one written by a single author.
                    By integrating real-time AI translation, we enable a truly global collaboration where a sentence written in Korean can seamlessly follow one written in English, French, or Japanese.
                </p>

                <h3>Features</h3>
                <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                    <li>Real-time AI Translation</li>
                    <li>Global Collaborative Writing</li>
                    <li>Anonymous Contribution</li>
                    <li>Live Updates</li>
                </ul>

                <p style={{ opacity: 0.7, fontSize: '0.9rem', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                    Built with Next.js, Supabase, and AI.
                    <br />
                    Designed for the world.
                </p>
            </div>
        </Modal>
    )
}
