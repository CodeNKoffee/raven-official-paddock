import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Car, Cpu, Microchip, Zap, Camera, Compass, Battery, Cable, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HardwareSpecs = () => {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const specs = [
    {
      icon: Car,
      name: t('hardwareSpecs.specs.chassis.name'),
      model: 'RAVEN GP',
      detail: t('hardwareSpecs.specs.chassis.detail'),
      status: 'ready',
    },
    {
      icon: Cpu,
      name: t('hardwareSpecs.specs.brain.name'),
      model: 'RPi 4B / Jetson',
      detail: t('hardwareSpecs.specs.brain.detail'),
      status: 'ready',
    },
    {
      icon: Microchip,
      name: t('hardwareSpecs.specs.controller.name'),
      model: 'RP2040 Connect',
      detail: t('hardwareSpecs.specs.controller.detail'),
      status: 'ready',
    },
    {
      icon: Zap,
      name: t('hardwareSpecs.specs.motor.name'),
      model: 'Fusion SE 1200KV',
      detail: t('hardwareSpecs.specs.motor.detail'),
      status: 'ready',
    },
    {
      icon: Camera,
      name: t('hardwareSpecs.specs.camera.name'),
      model: 'Intel RealSense',
      detail: t('hardwareSpecs.specs.camera.detail'),
      status: 'ready',
    },
    {
      icon: Compass,
      name: t('hardwareSpecs.specs.imu.name'),
      model: 'Arduino IMU',
      detail: t('hardwareSpecs.specs.imu.detail'),
      status: 'ready',
    },
    {
      icon: Battery,
      name: t('hardwareSpecs.specs.battery.name'),
      model: '2S LiPo 2200mAh',
      detail: t('hardwareSpecs.specs.battery.detail'),
      status: 'ready',
    },
    {
      icon: Cable,
      name: t('hardwareSpecs.specs.powerboard.name'),
      model: 'RAVEN Custom PCB',
      detail: t('hardwareSpecs.specs.powerboard.detail'),
      status: 'ready',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0, 0, 0.2, 1] as const,
      },
    },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // More sensitive movement for larger area
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    // Clamp values for smoother experience
    setMousePosition({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y))
    });
    // Store actual mouse position for cursor
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      {/* Diagonal racing stripes background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.1) 20px,
              rgba(255,255,255,0.1) 40px
            )`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            {t('hardwareSpecs.subtitle')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white racing-headline mb-4">
            {t('hardwareSpecs.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t('hardwareSpecs.description')}
          </p>
        </motion.div>

        {/* Specs Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Spec List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-3"
          >
            {specs.map((spec, index) => {
              const Icon = spec.icon;
              const isPending = spec.status === 'pending';
              return (
                <motion.div
                  key={spec.name}
                  variants={itemVariants}
                  className={`group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[hsl(0,0%,6%)] to-transparent border transition-all duration-300 ${isPending
                    ? 'border-yellow-500/30 hover:border-yellow-500/50'
                    : 'border-white/5 hover:border-primary/30'
                    }`}
                >
                  {/* Index Number */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isPending ? 'bg-yellow-500/10' : 'bg-primary/10'
                    }`}>
                    <span className={`text-xs font-bold racing-headline ${isPending ? 'text-yellow-500' : 'text-primary'
                      }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 transition-colors ${isPending ? 'group-hover:bg-yellow-500/10' : 'group-hover:bg-primary/10'
                    }`}>
                    <Icon className={`w-5 h-5 transition-colors ${isPending ? 'text-yellow-500/70 group-hover:text-yellow-500' : 'text-white/70 group-hover:text-primary'
                      }`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-white">
                        {spec.name}
                      </span>
                      <span className={`text-xs font-medium ${isPending ? 'text-yellow-500' : 'text-primary'
                        }`}>
                        {spec.model}
                      </span>
                      {isPending && (
                        <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
                          <Clock className="w-3 h-3" />
                          {t('hardwareSpecs.pending')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {spec.detail}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white">→</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column - Interactive 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]"
          >
            {/* Extended hover area for better mouse tracking */}
            <div
              ref={containerRef}
              className="absolute inset-[-50px] cursor-none"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false);
                setMousePosition({ x: 0, y: 0 });
              }}
            />

            <div
              className="relative w-full max-w-lg aspect-square group pointer-events-none"
              style={{ perspective: '1200px' }}
            >
              {/* Custom cursor - follows mouse directly */}
              {isHovering && (
                <motion.div
                  className="pointer-events-none fixed z-50 w-20 h-20 rounded-full border-2 border-primary/80 flex items-center justify-center backdrop-blur-sm bg-primary/5"
                  animate={{
                    left: cursorPos.x - 40,
                    top: cursorPos.y - 40,
                    scale: [1, 1.05, 1],
                    borderColor: ['hsl(210, 100%, 60%)', 'hsl(140, 100%, 50%)', 'hsl(210, 100%, 60%)'],
                  }}
                  transition={{
                    left: { type: 'spring', stiffness: 300, damping: 50, mass: 0.5 },
                    top: { type: 'spring', stiffness: 300, damping: 50, mass: 0.5 },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    borderColor: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                    {t('hardwareSpecs.drag')}
                  </span>
                </motion.div>
              )}

              {/* 3D Container */}
              <motion.div
                className="w-full h-full relative"
                animate={{
                  rotateY: mousePosition.x * 25,
                  rotateX: -mousePosition.y * 25,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Outer rings with 3D depth */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/10"
                  style={{ transform: 'translateZ(-40px)' }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border border-white/10"
                  style={{ transform: 'translateZ(-20px)' }}
                />
                <motion.div
                  className="absolute inset-8 rounded-full border-2 border-primary/30"
                  animate={{
                    boxShadow: isHovering
                      ? ['0 0 20px rgba(59,130,246,0.3)', '0 0 40px rgba(59,130,246,0.5)', '0 0 20px rgba(59,130,246,0.3)']
                      : '0 0 10px rgba(59,130,246,0.2)',
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Center content with 3D pop */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div className="text-center">
                    {/* 3D Car Icon Container */}
                    <motion.div
                      className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-primary/50 flex items-center justify-center relative overflow-hidden"
                      animate={{
                        boxShadow: isHovering
                          ? '0 25px 50px -12px rgba(59,130,246,0.5), 0 0 30px rgba(59,130,246,0.3)'
                          : '0 10px 30px -10px rgba(59,130,246,0.3)',
                      }}
                      whileHover={{ scale: 1.1 }}
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      {/* Animated gradient overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <Car className="w-12 h-12 text-primary relative z-10" strokeWidth={1.5} />
                    </motion.div>

                    <motion.p
                      className="text-3xl font-bold text-white racing-headline"
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      RAVEN
                    </motion.p>
                    <motion.p
                      className="text-sm text-muted-foreground mb-4"
                      style={{ transform: 'translateZ(35px)' }}
                    >
                      1/10 Scale Autonomous
                    </motion.p>

                    <motion.div
                      className="flex justify-center gap-2"
                      style={{ transform: 'translateZ(45px)' }}
                    >
                      <motion.span
                        className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/40"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(59,130,246,0.5)' }}
                      >
                        Skynet Infused
                      </motion.span>
                      <motion.span
                        className="px-4 py-1.5 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/40"
                        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(34,197,94,0.5)' }}
                      >
                        Constructor AI
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Orbital dots with 3D positions */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <motion.div
                    key={angle}
                    className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-primary to-cyan-400"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${angle}deg) translateX(140px) translateY(-50%) translateZ(${10 + i * 5}px)`,
                      boxShadow: '0 0 10px rgba(59,130,246,0.6)',
                    }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Connection lines on hover */}
                {isHovering && [0, 90, 180, 270].map((angle) => (
                  <motion.div
                    key={`line-${angle}`}
                    className="absolute top-1/2 left-1/2 origin-left h-[1px] bg-gradient-to-r from-primary/50 to-transparent"
                    style={{
                      width: '100px',
                      transform: `rotate(${angle}deg)`,
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: angle / 1000 }}
                  />
                ))}
              </motion.div>

              {/* Floating particles on hover */}
              {isHovering && [...Array(6)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-primary"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 0,
                  }}
                  animate={{
                    x: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                    y: `${50 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HardwareSpecs;

