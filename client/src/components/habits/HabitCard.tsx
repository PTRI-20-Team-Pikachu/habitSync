import { useState } from 'react';
import type {
  Habit,
  HabitFrequency,
  UpdateHabitValues,
} from '../../features/habits/habits.types';

type HabitCardProps = {
  habit: Habit;
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  onEditHabit: (id: string, values: UpdateHabitValues) => void;
};

export default function HabitCard({
  habit,
  onToggleHabit,
  onDeleteHabit,
  onEditHabit,
}: HabitCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(habit.title);
  const [goal, setGoal] = useState(habit.goal);
  const [frequency, setFrequency] = useState<HabitFrequency>(habit.frequency);

  function handleSave() {
    const trimmedTitle = title.trim();
    const trimmedGoal = goal.trim();

    if (!trimmedTitle || !trimmedGoal) return;

    onEditHabit(habit.id, {
      title: trimmedTitle,
      goal: trimmedGoal,
      frequency,
    });

    setIsEditing(false);
  }

  function handleCancel() {
    setTitle(habit.title);
    setGoal(habit.goal);
    setFrequency(habit.frequency);
    setIsEditing(false);
  }

  return (
    <article style={styles.card}>
      {isEditing ? (
        <>
          <label style={styles.label}>
            Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Goal
            <input
              type="text"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Frequency
            <select
              value={frequency}
              onChange={(event) =>
                setFrequency(event.target.value as HabitFrequency)
              }
              style={styles.input}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </label>

          <div style={styles.actions}>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 style={styles.title}>{habit.title}</h3>

          <p>
            <strong>Goal:</strong> {habit.goal}
          </p>

          <p>
            <strong>Frequency:</strong> {habit.frequency}
          </p>

          <p>
            <strong>Status:</strong> {habit.completed ? 'Completed' : 'Not completed'}
          </p>

          <div style={styles.actions}>
            <button type="button" onClick={() => onToggleHabit(habit.id)}>
              {habit.completed ? 'Mark as incomplete' : 'Mark as completed'}
            </button>

            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button type="button" onClick={() => onDeleteHabit(habit.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  );
}

const styles = {
  card: {
    border: '1px solid black',
    padding: '16px',
    marginBottom: '12px',
  },
  title: {
    marginTop: 0,
  },
  label: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '12px',
    flexWrap: 'wrap' as const,
  },
};