type PetStageCardProps = {
  completedHabitsCount: number;
};

function getPetStage(completedHabitsCount: number) {
  if (completedHabitsCount >= 10) return 'Dog';
  if (completedHabitsCount >= 5) return 'Puppy';
  return 'Tiny Pup';
}

export default function PetStageCard({
  completedHabitsCount,
}: PetStageCardProps) {
  const petStage = getPetStage(completedHabitsCount);

  return (
    <section style={styles.card}>
      <h2 style={styles.heading}>Your Pet</h2>
      <div style={styles.petBox}>
        <p style={styles.petEmoji}>🐶</p>
        <p><strong>Stage:</strong> {petStage}</p>
        <p><strong>Completed habits:</strong> {completedHabitsCount}</p>
      </div>
    </section>
  );
}

const styles = {
  card: {
    border: '1px solid black',
    padding: '16px',
    minHeight: '240px',
  },
  heading: {
    marginTop: 0,
  },
  petBox: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '160px',
  },
  petEmoji: {
    fontSize: '64px',
    margin: '0 0 12px 0',
  },
};