
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'The Continuity - A Global Collaborative Novel'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#000000',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'serif',
                    position: 'relative',
                }}
            >
                {/* Decorative Background Elements */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50px',
                        left: '50px',
                        right: '50px',
                        bottom: '50px',
                        border: '2px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '20px',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(0,0,0,0) 70%)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />

                {/* Main Title */}
                <div
                    style={{
                        color: '#d4af37',
                        fontSize: 100,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: 20,
                        textShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                        display: 'flex',
                    }}
                >
                    The Continuity
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        color: '#a1a1a1',
                        fontSize: 40,
                        textAlign: 'center',
                        maxWidth: '80%',
                        display: 'flex',
                    }}
                >
                    A Global Collaborative Novel
                </div>

                {/* Footer/Brand */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '80px',
                        color: '#555',
                        fontSize: 24,
                        display: 'flex',
                    }}
                >
                    thecontinuity.app
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
