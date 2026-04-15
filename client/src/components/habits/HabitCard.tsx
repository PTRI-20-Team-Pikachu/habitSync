import { useState } from 'react';
import type {
  Habit,
  HabitFrequency,
  UpdateHabitValues,
} from '../../features/habits/habits.types';

interface HabitCardProps {
  habit: Habit;
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  onEditHabit: (id: string, values: UpdateHabitValues) => void;
}

const FREQ_COLORS: Record<HabitFrequency, string> = {
  daily:  'var(--px-primary)',
  weekly: 'var(--px-gold)',
};

export function HabitCard({ habit, onToggleHabit, onDeleteHabit, onEditHabit }: HabitCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(habit.title);
  const [goal, setGoal] = useState(habit.goal);
  const [frequency, setFrequency] = useState<HabitFrequency>(habit.frequency);

  function handleSave() {
    const t = title.trim();
    const g = goal.trim();
    if (!t || !g) return;
    onEditHabit(habit.id, { title: t, goal: g, frequency });
    setIsEditing(false);
  }

  function handleCancel() {
    setTitle(habit.title);
    setGoal(habit.goal);
    setFrequency(habit.frequency);
    setIsEditing(false);
  }

  const freqColor = FREQ_COLORS[habit.frequency];

  return (
    <article
      style={{
        background: habit.completed ? 'var(--px-panel)' : 'var(--px-card)',
        border: `4px solid ${habit.completed ? 'var(--px-success)' : 'var(--px-border)'}`,
        boxShadow: `4px 4px 0 var(--px-shadow)`,
        padding: 16,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      {isEditing ? (
        /* ── Edit mode ─────────────────────────────────────── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10 }}>
            <div>
              <label className="px-label" htmlFor={`edit-title-${habit.id}`}>QUEST</label>
              <input
                id={`edit-title-${habit.id}`}
                type="text"
                className="px-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="px-label" htmlFor={`edit-goal-${habit.id}`}>GOAL</label>
              <input
                id={`edit-goal-${habit.id}`}
                type="text"
                className="px-input"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div>
              <label className="px-label" htmlFor={`edit-freq-${habit.id}`}>FREQ</label>
              <select
                id={`edit-freq-${habit.id}`}
                className="px-select"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as HabitFrequency)}
                style={{ width: 'auto', minWidth: 110 }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="px-btn px-btn-primary" onClick={handleSave}>
              ✓ SAVE
            </button>
            <button type="button" className="px-btn px-btn-ghost" onClick={handleCancel}>
              ✕ CANCEL
            </button>
          </div>
        </div>
      ) : (
        /* ── View mode ─────────────────────────────────────── */
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          {/* Checkbox */}
          <button
            type="button"
            className={`px-checkbox${habit.completed ? ' checked' : ''}`}
            onClick={() => onToggleHabit(habit.id)}
            aria-label={habit.completed ? 'Mark incomplete' : 'Mark complete'}
            style={{ marginTop: 2 }}
          >
            {habit.completed && (
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', lineHeight: 1 }}>✓</span>
            )}
          </button>

          {/* Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h3
                className="font-pixel"
                style={{
                  fontSize: 9,
                  color: habit.completed ? 'var(--px-text-muted)' : 'var(--px-heading)',
                  textDecoration: habit.completed ? 'line-through' : 'none',
                  lineHeight: 1.8,
                }}
              >
                {habit.title}
              </h3>

              {/* Frequency badge */}
              <span
                className="px-badge"
                style={{ color: freqColor, borderColor: freqColor, fontSize: 7 }}
              >
                {habit.frequency.toUpperCase()}
              </span>

              {/* XP badge */}
              <span
                className="px-badge"
                style={{ color: 'var(--px-gold)', borderColor: 'var(--px-gold)', fontSize: 7 }}
              >
                +10 XP
              </span>

              {/* Done badge */}
              {habit.completed && (
                <span
                  className="px-badge"
                  style={{ color: 'var(--px-success)', borderColor: 'var(--px-success)', fontSize: 7 }}
                >
                  ✓ DONE
                </span>
              )}
            </div>

            <p style={{ fontSize: 12, color: 'var(--px-text-muted)', margin: 0 }}>
              {habit.goal}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button
              type="button"
              className="px-btn px-btn-ghost"
              onClick={() => setIsEditing(true)}
              style={{ fontSize: 9, padding: '6px 10px' }}
              aria-label="Edit"
            >
              ✎
            </button>
            <button
              type="button"
              className="px-btn px-btn-danger"
              onClick={() => onDeleteHabit(habit.id)}
              style={{ fontSize: 9, padding: '6px 10px' }}
              aria-label="Delete"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
