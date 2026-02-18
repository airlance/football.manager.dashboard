interface GhostPlayerProps {
    label: string;
}

export function GhostPlayer({ label }: GhostPlayerProps) {
    return (
        <div className="flex flex-col items-center pointer-events-none select-none" style={{ opacity: 0.28 }}>
            {/* Ghost shirt */}
            <div style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' }}>
                <svg width="52" height="52" viewBox="0 0 40 40">
                    {/* Shirt body — glassy white */}
                    <path
                        d="M8 12 L4 18 L10 20 L10 34 L30 34 L30 20 L36 18 L32 12 L26 10 Q20 14 14 10 Z"
                        fill="rgba(255,255,255,0.12)"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth="1"
                    />
                    {/* Collar */}
                    <path
                        d="M14 10 Q20 16 26 10"
                        fill="none"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="1"
                    />
                    {/* Sleeve sheen */}
                    <path d="M8 12 L4 18 L10 20 L10 16" fill="rgba(255,255,255,0.08)" />
                    <path d="M32 12 L36 18 L30 20 L30 16" fill="rgba(255,255,255,0.08)" />
                </svg>
            </div>

            {/* Name badge — ghost style */}
            <div
                style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 5,
                    padding: '3px 8px',
                    marginTop: 2,
                    minWidth: 52,
                    textAlign: 'center',
                }}
            >
                <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.75)',
                    fontFamily: 'system-ui, sans-serif',
                    letterSpacing: '0.04em',
                }}>
                    {label}
                </div>
            </div>
        </div>
    );
}