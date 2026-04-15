interface ProgressSummaryProps {
  totalHabits: number;
  completedHabits: number;
}

interface StatRowProps {
  label: string;
  value: string | number;
  color?: string;
}

function StatRow({ label, value, color }: StatRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        borderBottom: '1px solid var(--px-border)',
      }}
    >
      <span
        className="font-pixel"
        style={{ fontSize: 7, color: 'var(--px-text-muted)' }}
      >
        {label}
      </span>
      <span
        className="font-pixel"
        style={{ fontSize: 8, color: color ?? 'var(--px-heading)' }}
      >
        {value}
      </span>
    </div>
  );
}

export function ProgressSummary({ totalHabits, completedHabits }: ProgressSummaryProps) {
  const rate = totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

  return (
    <section
      className="px-border"
      style={{ background: 'var(--px-panel)', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Title */}
      <div style={{ borderBottom: '2px solid var(--px-border)', paddingBottom: 10 }}>
        <h2
          className="font-pixel"
          style={{ fontSize: 8, color: 'var(--px-primary)', lineHeight: 1.8 }}
        >
          TODAY'S STATS
        </h2>
      </div>

      {/* Stats */}
      <div>
        <StatRow label="TOTAL QUESTS"    value={totalHabits} />
        <StatRow label="COMPLETED"       value={completedHabits} color="var(--px-success)" />
        <StatRow label="COMPLETION RATE" value={`${rate}%`}      color="var(--px-gold)" />
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div className="px-xp-bar-track">
          <div
            className="px-xp-bar-fill"
            style={{
              width: `${rate}%`,
              background: rate === 100 ? 'var(--px-success)' : 'var(--px-primary)',
            }}
          />
        </div>
        {rate === 100 && (
          <p
            className="font-pixel"
            style={{ fontSize: 7, color: 'var(--px-success)', textAlign: 'center', lineHeight: 2 }}
          >
            ★ ALL QUESTS DONE! ★
          </p>
        )}
      </div>
    </section>
  );
}
