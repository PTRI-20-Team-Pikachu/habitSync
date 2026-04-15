import { useEffect, useMemo, useState } from 'react';
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

const HABITS_STORAGE_KEY = 'habit-tracker-habits';

export default function DashboardPage() {
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
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  }

  function handleDelete(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  function handleEdit(id: string, values: UpdateHabitValues) {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, ...values } : h
      )
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h1
          className="font-pixel"
          style={{ fontSize: 16, color: 'var(--px-heading)', lineHeight: 1.8 }}
        >
          ⚔ DASHBOARD
        </h1>
        <p
          className="font-pixel"
          style={{ fontSize: 8, color: 'var(--px-text-muted)', lineHeight: 2 }}
        >
          Today's quests — stay consistent, hero.
        </p>
      </div>

      {/* Main grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <PetStageCard completedHabitsCount={completedCount} />
          <ProgressSummary
            totalHabits={habits.length}
            completedHabits={completedCount}
          />
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <HabitForm onCreateHabit={handleCreate} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2
              className="font-pixel"
              style={{ fontSize: 10, color: 'var(--px-heading)', lineHeight: 1.8 }}
            >
              YOUR QUESTS
            </h2>
            <HabitList
              habits={habits}
              onToggleHabit={handleToggle}
              onDeleteHabit={handleDelete}
              onEditHabit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
