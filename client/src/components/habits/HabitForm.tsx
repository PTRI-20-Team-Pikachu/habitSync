import { FormEvent, useState } from 'react';
import type { HabitFrequency } from '../../features/habits/habits.types';

type HabitFormValues = {
  title: string;
  goal: string;
  frequency: HabitFrequency;
};

type HabitFormProps = {
  onCreateHabit: (values: HabitFormValues) => void;
};

export default function HabitForm({ onCreateHabit }: HabitFormProps) {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedGoal = goal.trim();

    if (!trimmedTitle || !trimmedGoal) return;

    onCreateHabit({
      title: trimmedTitle,
      goal: trimmedGoal,
      frequency,
    });

    setTitle('');
    setGoal('');
    setFrequency('daily');
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Create Habit</h2>

      <label style={styles.label}>
        Habit title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Drink water"
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Goal
        <input
          type="text"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Lose weight"
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Frequency
        <select
          value={frequency}
          onChange={(event) => setFrequency(event.target.value as HabitFrequency)}
          style={styles.input}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </label>

      <button type="submit" style={styles.button}>
        Add Habit
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    maxWidth: '420px',
    marginBottom: '24px',
    border: '1px solid black',
    padding: '16px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 14px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};