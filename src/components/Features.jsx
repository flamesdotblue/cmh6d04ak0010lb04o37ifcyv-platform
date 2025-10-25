import React from 'react';
import { Dumbbell, Brain, Activity, Mic, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: Dumbbell,
    title: 'Personalized Plans',
    desc: 'Workouts adapt to your level, goals, and available equipment—no copy-paste routines.'
  },
  {
    icon: Brain,
    title: 'Real-time Coaching',
    desc: 'Get form tips and pacing guidance. Your coach learns from every session.'
  },
  {
    icon: Mic,
    title: 'Voice-first Experience',
    desc: 'Hands-free guidance with conversational start/stop, scaling, and substitutions.'
  },
  {
    icon: Activity,
    title: 'Habit Loops',
    desc: 'Micro-challenges, streaks, and recovery prompts to build consistent progress.'
  },
  {
    icon: Shield,
    title: 'Safe Progression',
    desc: 'Adaptive loading and deload weeks to reduce injury risk and overtraining.'
  },
  {
    icon: Clock,
    title: 'Time-smart',
    desc: 'Optimized sessions for 20, 30, or 45 minutes. Your calendar, your rules.'
  }
];

export default function Features() {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight">Why train with AI?</h2>
      <p className="mt-2 max-w-2xl text-zinc-400">A coaching stack built for real life—smarter than a routine, more flexible than a class, more consistent than a buddy.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-violet-500/0 via-fuchsia-500/0 to-orange-400/0 opacity-0 transition-opacity group-hover:opacity-20" />
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white/10 p-2.5 text-white ring-1 ring-white/15">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-zinc-300">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
