import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

const GOALS = ['Fat loss', 'Muscle gain', 'Endurance', 'General fitness'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const EQUIPMENT = ['None', 'Dumbbells', 'Bands', 'Barbell + Rack', 'Machines'];

function generatePlan({ level, goal, days, equipment }) {
  const dayCount = Number(days) || 3;
  const focus = goal === 'Muscle gain' ? 'Hypertrophy' : goal === 'Fat loss' ? 'Metabolic' : goal === 'Endurance' ? 'Aerobic' : 'Balanced';
  const split = dayCount >= 4 ? ['Upper', 'Lower', 'Push', 'Pull'] : dayCount === 3 ? ['Full Body A', 'Full Body B', 'Full Body C'] : ['Full Body', 'Full Body'];
  const time = dayCount <= 3 ? 30 : 45;
  const warmup = equipment === 'None' ? 'Mobility + bodyweight activation' : 'Dynamic warm-up + ramp-up sets';
  const accessories = equipment === 'None' ? 'Core + unilateral bodyweight' : 'Core + isolation sets';

  const sessions = Array.from({ length: dayCount }).map((_, i) => ({
    title: split[i % split.length],
    blocks: [
      { name: 'Warm-up', items: [warmup, 'Light cardio 3-5 min'] },
      {
        name: 'Primary',
        items: focus === 'Hypertrophy'
          ? ['Compound lift 3x6-10', 'Secondary lift 3x8-12']
          : focus === 'Metabolic'
          ? ['Compound circuit 3 rounds', 'Tempo intervals 6-8 min']
          : focus === 'Aerobic'
          ? ['Zone 2 cardio 20-30 min', 'Cadence holds 4x2 min']
          : ['Compound lift 3x6-8', 'Accessory circuit 3 rounds']
      },
      { name: 'Accessories', items: [accessories, 'Cooldown + breathwork 3 min'] }
    ],
    duration: `${time} min`
  }));

  return { focus, split, sessions, tips: [
    'Increase load or reps by 2-5% weekly if RPE < 8.',
    'Keep 1-2 reps in reserve on compounds.',
    'Sleep 7-9 hours and hydrate well to recover.'
  ]};
}

export default function PlanForm() {
  const [level, setLevel] = useState(LEVELS[0]);
  const [goal, setGoal] = useState(GOALS[0]);
  const [equipment, setEquipment] = useState(EQUIPMENT[0]);
  const [days, setDays] = useState(3);
  const [plan, setPlan] = useState(null);

  const canGenerate = useMemo(() => days >= 2 && days <= 6, [days]);

  function handleSubmit(e) {
    e.preventDefault();
    const result = generatePlan({ level, goal, days, equipment });
    setPlan(result);
    const target = document.getElementById('plan-output');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold">Build your smart plan</h2>
        <p className="mt-2 max-w-2xl text-zinc-400">Answer a few questions—your AI coach generates an adaptive program that grows with you.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-zinc-300">Experience level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50">
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-300">Primary goal</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50">
            {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-300">Equipment</label>
          <select value={equipment} onChange={(e) => setEquipment(e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50">
            {EQUIPMENT.map(eq => <option key={eq} value={eq}>{eq}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-300">Days per week</label>
          <input type="number" min={2} max={6} value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
          <p className="text-xs text-zinc-400">Recommended: 3-5 days</p>
        </div>

        <div className="md:col-span-2 mt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-zinc-400">Level: <span className="text-white">{level}</span> • Goal: <span className="text-white">{goal}</span> • Equipment: <span className="text-white">{equipment}</span> • Days: <span className="text-white">{days}</span></div>
          <button disabled={!canGenerate} className="inline-flex items-center gap-2 rounded-lg bg-violet-500/90 px-4 py-2 font-medium text-white shadow-lg shadow-violet-500/20 ring-1 ring-white/10 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50">
            <Sparkles className="h-4 w-4" /> Generate Plan
          </button>
        </div>
      </form>

      {plan && (
        <motion.div id="plan-output" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-10 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Program Overview</h3>
            <p className="mt-2 text-zinc-300">Focus: <span className="text-white font-medium">{plan.focus}</span>. Split example: <span className="text-white font-medium">{plan.split.join(' • ')}</span>.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {plan.sessions.map((s, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Day {idx + 1}: {s.title}</h4>
                  <span className="text-xs rounded-full bg-white/10 px-2 py-1 text-zinc-300">{s.duration}</span>
                </div>
                <div className="mt-3 space-y-3">
                  {s.blocks.map((b, i) => (
                    <div key={i}>
                      <p className="text-sm text-zinc-400">{b.name}</p>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                        {b.items.map((it, k) => (
                          <li key={k} className="text-zinc-200">{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h4 className="font-medium">Coaching tips</h4>
            <ul className="mt-2 space-y-2">
              {plan.tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-violet-300" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
