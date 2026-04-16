import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HabitForm } from '../components/habits/HabitForm';
import { HabitList } from '../components/habits/HabitList';
import { PetStageCard } from '../components/pet/PetStageCard';
import { ProgressSummary } from '../components/progress/ProgressSummary';
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

interface LayoutContext {
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
}

const HABITS_STORAGE_KEY = 'habit-tracker-habits';

export default function DashboardPage() {
  const { setXp } = useOutletContext<LayoutContext>();

  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const stored = localStorage.getItem(HABITS_STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Failed to save habits:', error);
    }
  }, [habits]);

  const completedCount = useMemo(
    () => habits.filter((h) => h.completed).length,
    [habits]
  );

  function handleCreate(values: HabitFormValues) {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      title: values.title,
      goal: values.goal,
      frequency: values.frequency,
      completed: false,
    };

    setHabits((prev) => [newHabit, ...prev]);
  }

  function handleToggle(id: string) {
    let xpDelta = 0;

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const newCompleted = !h.completed;
        xpDelta = newCompleted ? 10 : -10;

        return { ...h, completed: newCompleted };
      })
    );

    setXp((prevXp) => Math.max(prevXp + xpDelta, 0));
  }

  function handleDelete(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  function handleEdit(id: string, values: UpdateHabitValues) {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...values } : h))
    );
  }

  return (
    <div className="page">
      <div className="shell">
        <div>
          <h1 className="page-title font-pixel">DASHBOARD</h1>
          <p className="page-subtitle font-pixel">
            Today&apos;s quests — stay consistent, hero.
          </p>
        </div>

        <div className="grid">
          <div className="stack">
            <PetStageCard completedHabitsCount={completedCount} />
            <ProgressSummary
              totalHabits={habits.length}
              completedHabits={completedCount}
            />
          </div>

          <div className="stack">
            <HabitForm onCreateHabit={handleCreate} />

            <section className="quests-panel">
              <div className="quest-section-head">
                <span className="orb" />
                <h2 className="panel-title">QUEST LOG</h2>
                <span className="trail" />
              </div>

              <HabitList
                habits={habits}
                onToggleHabit={handleToggle}
                onDeleteHabit={handleDelete}
                onEditHabit={handleEdit}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
