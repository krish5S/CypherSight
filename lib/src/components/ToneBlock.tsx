'use client';

interface ToneBlockProps {
  percent: number;
}

export default function ToneBlock({ percent }: ToneBlockProps) {
  const p = Number.isFinite(percent) ? percent : 0;
  const tone = p < 50 ? 'green' : p > 70 ? 'red' : 'yellow';

  const toneClasses =
    tone === 'red'
      ? 'bg-red-500/20 border-red-500/30 text-red-300'
      : tone === 'green'
        ? 'bg-green-500/20 border-green-500/30 text-green-300'
        : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';

  return (
    <div className={`p-3 rounded-lg border ${toneClasses}`}>
      <div className="text-sm opacity-75">Fraud percentage</div>
      <div className="mt-1 font-mono text-3xl font-bold">{p.toFixed(0)}%</div>
    </div>
  );
}
