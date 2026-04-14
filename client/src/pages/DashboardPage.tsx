import { useEffect, useMemo, useState } from 'react';
import HabitForm from '../components/habits/HabitForm';
import HabitList from '../components/habits/HabitList';
import PetStageCard from '../components/pet/PetStageCard';
import ProgressSummary from '../components/progress/ProgressSummary';
import type {
  Habit,
  HabitFrequency,
  UpdateHabitValues,
} from '../features/habits/habits.types';

type HabitFormValues = {
  title: string;
  goal: string;
  frequency: HabitFrequency;
};

const HABITS_STORAGE_KEY = 'habit-tracker-habits';

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const storedHabits = localStorage.getItem(HABITS_STORAGE_KEY);

      if (!storedHabits) return [];

      const parsedHabits = JSON.parse(storedHabits);

      if (!Array.isArray(parsedHabits)) return [];

      return parsedHabits;
    } catch (error) {
      console.error('Failed to read habits from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Failed to save habits to localStorage:', error);
    }
  }, [habits]);

  const completedHabitsCount = useMemo(
    () => habits.filter((habit) => habit.completed).length,
    [habits]
  );

  function handleCreateHabit(values: HabitFormValues) {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      title: values.title,
      goal: values.goal,
      frequency: values.frequency,
      completed: false,
    };

    setHabits((currentHabits) => [newHabit, ...currentHabits]);
  }

  function handleToggleHabit(id: string) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  }

  function handleDeleteHabit(id: string) {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== id)
    );
  }

  function handleEditHabit(id: string, values: UpdateHabitValues) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              title: values.title,
              goal: values.goal,
              frequency: values.frequency,
            }
          : habit
      )
    );
  }

  return (
    <section style={styles.page}>
      <div style={styles.headerBlock}>
        <h1 style={styles.pageTitle}>Dashboard</h1>
        <p style={styles.pageSubtitle}>
          Track your goals and build consistency.
        </p>
      </div>

      <div style={styles.grid}>
        <div style={styles.leftColumn}>
          <PetStageCard completedHabitsCount={completedHabitsCount} />
        </div>

        <div style={styles.rightColumn}>
          <ProgressSummary
            totalHabits={habits.length}
            completedHabits={completedHabitsCount}
          />

          <section style={styles.habitsPanel}>
            <HabitForm onCreateHabit={handleCreateHabit} />

            <div>
              <h2 style={styles.sectionTitle}>Your Habits</h2>
              <HabitList
                habits={habits}
                onToggleHabit={handleToggleHabit}
                onDeleteHabit={handleDeleteHabit}
                onEditHabit={handleEditHabit}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  headerBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  pageTitle: {
    margin: 0,
  },
  pageSubtitle: {
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '24px',
    alignItems: 'start',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  habitsPanel: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  },
  sectionTitle: {
    marginTop: 0,
  },
};