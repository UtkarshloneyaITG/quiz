import React from 'react';
import { motion } from 'framer-motion';

// SVG glow filter (unchanged)
const SvgFilters = () => (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" >
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#A78BFA" floodOpacity="0.7" />
            </filter>
            <filter id="shadowFlicker" x="-50%" y="-50%" width="200%" height="200%" >
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
            </filter>
            <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
        </defs>
    </svg>
);

// New simpler SVG background blob with no loop animation
const NewBlob = ({ color = '#4F46E5', className = '', style = {} }) => {
    const pathVariants = {
        morph: {
            d: [
                "M60,-50C75,-25,80,0,70,25C60,50,40,75,15,70C-10,65,-40,40,-55,10C-70,-20,-70,-55,-50,-70C-30,-85,0,-80,20,-65C40,-50,45,-75,60,-50Z",
                "M55,-45C70,-20,75,10,65,30C55,50,30,70,10,60C-10,50,-35,25,-50,0C-65,-25,-65,-60,-45,-70C-25,-80,5,-70,25,-60C45,-50,40,-70,55,-45Z"
            ],
            opacity: [0.5, 1, 0.5]
        }
    };

    return (
        <motion.svg
            className={className}
            style={style}
            viewBox="0 0 140 140"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <motion.path
                fill={color}
                filter="url(#glow)"
                variants={pathVariants}
                animate="morph"
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: 0,  // no repeat, play once
                    repeatType: "reverse",
                }}
            />
        </motion.svg>
    );
};

// New wave shape that animates horizontally once (no loop)
const NewWave = ({ className = '' }) => {
    const waveVariants = {
        animate: {
            x: [0, 20, 0],
            y: [0, -5, 0]
        }
    };

    return (
        <motion.svg
            className={className}
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            variants={waveVariants}
            animate="animate"
            transition={{ duration: 8, repeat: 0, ease: "easeInOut" }}
        >
            <motion.path
                fill="#181345"
                d="M0,96L48,80C96,64,192,32,288,42.7C384,53,480,107,576,144C672,181,768,203,864,192C960,181,1056,139,1152,112C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
        </motion.svg>
    );
};

// ConfettiBurst with one-time burst animation
const ConfettiBurst = () => {
    const confettiColors = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#A78BFA'];

    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" pointerEvents="none">
            {confettiColors.map((color, i) => (
                <motion.rect
                    key={i}
                    x="48"
                    y="48"
                    width="4"
                    height="8"
                    rx="1"
                    fill={color}
                    initial={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                    animate={{
                        x: [0, (Math.random() - 0.5) * 70],
                        y: [0, (Math.random() * 40) + 40],
                        opacity: [1, 0],
                        rotate: [0, 360],
                        scale: [1, 0.5]
                    }}
                    transition={{
                        duration: 3,
                        repeat: 0,  // play once only
                        delay: i * 0.15,
                        ease: 'easeOut'
                    }}
                />
            ))}
        </svg>
    );
};

// Sparkle with one-time rotation animation
const Sparkle = ({ size = 20, color = 'gold', style = {} }) => (
    <motion.svg
        style={style}
        className="absolute"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: 0, opacity: 0.8, scale: 1 }}
        animate={{
            rotate: 360,
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.3, 1]
        }}
        transition={{ duration: 4, repeat: 0, ease: 'easeInOut' }} // no loop
    >
        <path d="M12 2L13.09 8.26L19 8.27L14 12.97L15.18 19L12 15.77L8.82 19L10 12.97L5 8.27L10.91 8.26L12 2Z" />
    </motion.svg>
);

// Bubble with no repeat
const Bubble = ({ delay = 0, size = 15, color = '#a78bfa', style = {} }) => {
    const xMotion = [-5, 5, -5];

    return (
        <motion.div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: color,
                position: 'absolute',
                ...style,
            }}
            initial={{ y: 0, opacity: 0.7, scale: 1, x: 0 }}
            animate={{ y: -60, opacity: 0, scale: 0.6, x: xMotion }}
            transition={{
                delay,
                duration: 4,
                repeat: 0,  // play once
                ease: 'easeInOut',
            }}
        />
    );
};

const Leaderboard = () => {

    // Shadow flicker animation variant for winner circles (kept infinite flicker for subtle effect)
    const shadowFlicker = {
        animate: {
            filter: [
                "drop-shadow(0 0 3px rgba(255,255,255,0.5))",
                "drop-shadow(0 0 12px rgba(255,255,255,0.9))",
                "drop-shadow(0 0 3px rgba(255,255,255,0.5))"
            ]
        },
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const winners = [
        { place: 2, label: '2nd Winner', crown: '🥈' },
        { place: 1, label: '1st Winner', crown: '👑' },
        { place: 3, label: '3rd Winner', crown: '🥉' },
    ];

    return (
        <main className="w-full h-full bg-[#1E293B] relative overflow-hidden flex justify-center  p-10">

            {/* SVG Filters for glow & shadows */}
            <SvgFilters />

            {/* Background SVGs */}
            <motion.div className="absolute inset-0 pointer-events-none select-none">
                <NewBlob color="#2563EB" className="absolute top-16 left-16 w-72 h-72" />
                <NewBlob color="#F43F5E" className="absolute bottom-24 right-24 w-80 h-80" />
                <NewWave className="absolute bottom-0 left-0 w-full" />
            </motion.div>

            {/* Foreground blobs with fixed positions (removed parallax y) */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-30">
                <NewBlob color="#22C55E" className="w-full h-full" />
            </div>

            <div className="absolute bottom-0 left-0 w-64 h-64 opacity-30">
                <NewBlob color="#EAB308" className="w-full h-full" />
            </div>

            {/* Main Leaderboard Box without scroll scale */}
            <motion.div
                className="w-full  border border-white rounded-3xl p-10 bg-purple-400/10 backdrop-blur-sm z-10 flex flex-col items-center space-y-10 shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.h1
                    className="text-5xl font-extrabold text-white select-none"
                    initial={{ opacity: 0, y: -30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    🏆 Leaderboard
                </motion.h1>

                <div className="flex items-end justify-center w-full gap-16">
                    {winners.map((winner, index) => {
                        const isFirst = winner.place === 1;
                        const isSecond = winner.place === 2;
                        const isThird = winner.place === 3;

                        return (
                            <motion.div
                                key={winner.place}
                                className="flex flex-col items-center relative cursor-pointer select-none"
                                initial={{ opacity: 0, y: 80, scale: 0.85 }}
                                animate={{
                                    opacity: 1,
                                    scale: [1, 1.1, 1],
                                    y: [0, -20, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    delay: index * 0.3,
                                    duration: 3,
                                    ease: "easeInOut",
                                }}
                                whileHover={{ scale: 1.15, y: -25, rotate: 0, }}
                                drag
                                dragConstraints={{
                                    top: -100,
                                    left: -500,
                                    right: 500,
                                    bottom: 100,
                                }}
                            >
                                {/* Crown with gentle bounce & rotate */}
                                <motion.div
                                    className="text-6xl mb-4 select-none"
                                    initial={{ scale: 0.8, rotate: -5 }}
                                    animate={{ scale: [0.8, 1, 0.9], rotate: [-5, 10, -5, 0] }}
                                    transition={{ duration: 4, ease: "easeInOut" }}  // no loop
                                >
                                    {winner.crown}
                                </motion.div>

                                {/* Winner circle with glow + shadow flicker, no scale transform */}
                                <motion.div
                                    className="rounded-full bg-gray-900 flex items-center justify-center w-44 h-44 shadow-xl relative overflow-hidden"
                                    variants={shadowFlicker}
                                    animate="animate"
                                >
                                    {/* Shine sweep animation for 1st place (changed to no loop) */}
                                    {isFirst && (
                                        <motion.div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: '-60%',
                                                width: '60%',
                                                height: '100%',
                                                background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)',
                                                transform: 'skewX(-25deg)',
                                                pointerEvents: 'none',
                                            }}
                                            animate={{ left: ['-60%', '120%'] }}
                                            transition={{ repeat: 0, duration: 3, ease: 'easeInOut' }}
                                        />
                                    )}

                                    <p className="text-6xl font-extrabold text-white z-10 select-none">{winner.place}</p>

                                    {/* Animations for each winner */}
                                    {isFirst && <ConfettiBurst />}
                                    {(isSecond || isThird) && (
                                        <>
                                            <Sparkle size={24} color="#FCD34D" style={{ top: 12, left: 6 }} />
                                            <Sparkle size={18} color="#F87171" style={{ top: 38, right: 14 }} />
                                            <Sparkle size={14} color="#60A5FA" style={{ bottom: 12, left: 20 }} />
                                        </>
                                    )}

                                    {/* Cartoon bubbles rising with randomized float */}
                                    <Bubble delay={0} size={14} color="#D8B4FE" style={{ bottom: 5, left: 14 }} />
                                    <Bubble delay={1.2} size={10} color="#F9A8D4" style={{ bottom: 15, right: 18 }} />
                                    <Bubble delay={2.4} size={12} color="#93C5FD" style={{ bottom: 10, left: 28 }} />
                                </motion.div>

                                <motion.h2
                                    className="text-2xl text-white mt-6 select-none"
                                    whileHover={{ scale: 1.1, color: '#FFD700' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {winner.label}
                                </motion.h2>
                            </motion.div>
                        );
                    })}
                </div>

                <div className='winner-list w-full h-full p-5 flex flex-col gap-3 '>
                  {/* Your list content unchanged */}
                  <div className='flex justify-between rounded-3xl text-2xl bg-purple-900/40 p-5'>
                    <div className='text-2xl text-white'>01</div>
                    <div className='text-white'>Name</div>
                    <div className='text-white'>Score</div>
                  </div>
                 
                  {/* Repeat the above block as needed */}
                </div>
            </motion.div>
        </main>
    );
};

export default Leaderboard;
