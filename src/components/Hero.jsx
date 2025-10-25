import React from 'react';
import Spline from '@splinetool/react-spline';
import { MotionConfig, motion } from 'framer-motion';
import { Rocket, Mic, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[92vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,rgba(124,58,237,0.35),rgba(0,0,0,0.15)_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_30%_at_50%_50%,rgba(99,102,241,0.25),transparent_60%)]" />

      <div className="relative z-10 h-full">
        <MotionConfig reducedMotion="user">
          <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
              <Mic className="h-3.5 w-3.5 text-violet-300" />
              Voice-first AI coach
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="mt-4 bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-5xl font-semibold leading-tight text-transparent md:text-6xl">
              Your Personal AI Gym Trainer
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="mx-auto mt-4 max-w-2xl text-zinc-300">
              Adaptive workout plans, real-time form feedback, and habit coaching—customized entirely to your goals, equipment, and schedule.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <a href="#plan" className="inline-flex items-center gap-2 rounded-lg bg-violet-500/90 px-5 py-3 font-medium text-white shadow-lg shadow-violet-500/25 ring-1 ring-white/10 backdrop-blur transition hover:bg-violet-500">
                <Rocket className="h-4 w-4" />
                Start Assessment
              </a>
              <a href="#coach" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 font-medium text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white/20">
                <Play className="h-4 w-4" />
                Talk to Coach
              </a>
            </motion.div>
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}
