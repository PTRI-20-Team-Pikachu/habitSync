import { HabitCard } from './HabitCard';
import type { Habit, UpdateHabitValues } from '../../features/habits/habits.types';

interface HabitListProps {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  onEditHabit: (id: string, values: UpdateHabitValues) => void;
}

export function HabitList({ habits, onToggleHabit, onDeleteHabit, onEditHabit }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div
        className="px-border"
        style={{
          background: 'var(--px-panel)',
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 48 }}>📜</span>
        <p
          className="font-pixel"
          style={{ fontSize: 8, color: 'var(--px-text-muted)', textAlign: 'center', lineHeight: 2 }}
        >
          No quests yet.
          <br />
          Add your first habit above!
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggleHabit={onToggleHabit}
          onDeleteHabit={onDeleteHabit}
          onEditHabit={onEditHabit}
        />
      ))}
    </div>
  );
}
