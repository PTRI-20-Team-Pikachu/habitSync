type ProgressSummaryProps = {
  totalHabits: number;
  completedHabits: number;
};

export default function ProgressSummary({
  totalHabits,
  completedHabits,
}: ProgressSummaryProps) {
  const completionRate =
    totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

  return (
    <section style={styles.card}>
      <h2 style={styles.heading}>Progress Summary</h2>
      <div style={styles.stats}>
        <p><strong>Total habits:</strong> {totalHabits}</p>
        <p><strong>Completed:</strong> {completedHabits}</p>
        <p><strong>Completion rate:</strong> {completionRate}%</p>
      </div>
    </section>
  );
}

const styles = {
  card: {
    border: '1px solid black',
    padding: '16px',
  },
  heading: {
    marginTop: 0,
  },
  stats: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
};