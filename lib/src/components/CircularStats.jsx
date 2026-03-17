function CircularStat({ value, label, sublabel, color }) {
  const colorMap = {
    cyan: {
      border: 'border-cyan-500/40 group-hover:border-cyan-500/70 group-hover:shadow-cyan-500/50',
      innerBorder: 'border-cyan-500/20 group-hover:border-cyan-500/40',
      gradient: 'from-cyan-500/10 group-hover:from-cyan-500/20 to-blue-500/10 group-hover:to-blue-500/20',
      text: 'text-cyan-400',
    },
    purple: {
      border: 'border-purple-500/40 group-hover:border-purple-500/70 group-hover:shadow-purple-500/50',
      innerBorder: 'border-purple-500/20 group-hover:border-purple-500/40',
      gradient: 'from-purple-500/10 group-hover:from-purple-500/20 to-pink-500/10 group-hover:to-pink-500/20',
      text: 'text-purple-400',
    },
    green: {
      border: 'border-green-500/40 group-hover:border-green-500/70 group-hover:shadow-green-500/50',
      innerBorder: 'border-green-500/20 group-hover:border-green-500/40',
      gradient: 'from-green-500/10 group-hover:from-green-500/20 to-emerald-500/10 group-hover:to-emerald-500/20',
      text: 'text-green-400',
    },
  }

  const colors = colorMap[color]

  return (
    <div className="group perspective">
      <div className="relative w-40 h-40 lg:w-48 lg:h-48 transition-transform duration-300 ease-out hover:scale-110 cursor-pointer">
        <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 group-hover:shadow-lg ${colors.border}`} />
        <div className={`absolute inset-2 rounded-full border transition-all duration-300 ${colors.innerBorder}`} />
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br transition-all duration-300 ${colors.gradient}`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl lg:text-6xl font-bold font-mono ${colors.text}`}>{value}</div>
          <div className="text-xs lg:text-sm text-gray-400 mt-2 text-center px-2">{label}</div>
          <div className="text-xs text-gray-500 mt-1">{sublabel}</div>
        </div>
      </div>
    </div>
  )
}

export default function CircularStats() {
  const stats = [
    {
      value: 567,
      label: 'Active Users',
      sublabel: 'Online now',
      color: 'cyan',
    },
    {
      value: '1.2K',
      label: 'Scams Detected',
      sublabel: 'Total detections',
      color: 'purple',
    },
    {
      value: '92.4%',
      label: 'Accuracy Rate',
      sublabel: 'Detection accuracy',
      color: 'green',
    },
  ]

  return (
    <section className="mb-16">
      <div className="flex justify-center items-center gap-8 lg:gap-12 flex-wrap">
        {stats.map((stat, idx) => (
          <CircularStat
            key={idx}
            value={stat.value}
            label={stat.label}
            sublabel={stat.sublabel}
            color={stat.color}
          />
        ))}
      </div>
    </section>
  )
}
