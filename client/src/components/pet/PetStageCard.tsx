interface PetStageCardProps {
  completedHabitsCount: number;
}

interface PetStage {
  label: string;
  emoji: string;
  xpNeeded: number;
  color: string;
}

const PET_STAGES: PetStage[] = [
  { label: 'TINY PUP',  emoji: '🐶', xpNeeded: 5,  color: 'var(--px-text-muted)' },
  { label: 'PUPPY',     emoji: '🐕', xpNeeded: 10, color: 'var(--px-primary)' },
  { label: 'DOG',       emoji: '🦮', xpNeeded: 999, color: 'var(--px-gold)' },
];

function getPetStage(count: number): PetStage {
  if (count >= 10) return PET_STAGES[2];
  if (count >= 5)  return PET_STAGES[1];
  return PET_STAGES[0];
}

export function PetStageCard({ completedHabitsCount }: PetStageCardProps) {
  const stage = getPetStage(completedHabitsCount);
  const nextStage = PET_STAGES.find((s) => s.xpNeeded > completedHabitsCount);
  const progress = nextStage
    ? Math.min((completedHabitsCount / nextStage.xpNeeded) * 100, 100)
    : 100;

  return (
    <section
      className="px-border"
      style={{
        background: 'var(--px-panel)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Title bar */}
      <div style={{ borderBottom: '2px solid var(--px-border)', paddingBottom: 10 }}>
        <h2
          className="font-pixel"
          style={{ fontSize: 8, color: 'var(--px-primary)', lineHeight: 1.8 }}
        >
          PET COMPANION
        </h2>
      </div>

      {/* Pet display */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          padding: '12px 0',
        }}
      >
        <div
          style={{
            fontSize: 72,
            lineHeight: 1,
            filter: 'drop-shadow(3px 3px 0 rgba(0,0,0,0.4))',
          }}
        >
          {stage.emoji}
        </div>

        <span
          className="font-pixel px-badge"
          style={{ color: stage.color, borderColor: stage.color, fontSize: 7 }}
        >
          {stage.label}
        </span>
      </div>

      {/* XP to next level */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div
          className="font-pixel"
          style={{
            fontSize: 7,
            color: 'var(--px-text-muted)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>PROGRESS</span>
          <span style={{ color: 'var(--px-gold)' }}>
            {completedHabitsCount} / {nextStage?.xpNeeded ?? '∞'}
          </span>
        </div>
        <div className="px-xp-bar-track">
          <div className="px-xp-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        {nextStage && (
          <p
            className="font-pixel"
            style={{ fontSize: 6, color: 'var(--px-text-muted)', textAlign: 'center', lineHeight: 2 }}
          >
            {nextStage.xpNeeded - completedHabitsCount} habits to evolve
          </p>
        )}
      </div>
    </section>
  );
}
