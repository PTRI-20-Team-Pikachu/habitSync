import HabitCard from './HabitCard';
import type {
  Habit,
  UpdateHabitValues,
} from '../../features/habits/habits.types';

type HabitListProps = {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  onEditHabit: (id: string, values: UpdateHabitValues) => void;
};

export default function HabitList({
  habits,
  onToggleHabit,
  onDeleteHabit,
  onEditHabit,
}: HabitListProps) {
  if (habits.length === 0) {
    return <p>No habits yet. Create your first one.</p>;
  }

  return (
    <section>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggleHabit={onToggleHabit}
          onDeleteHabit={onDeleteHabit}
          onEditHabit={onEditHabit}
        />
      ))}
    </section>
  );
}