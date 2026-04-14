import express from 'express';
import habitController from '../controllers/habitController.ts';

const habitRouter = express.Router();

// GET /habits?user_id=<id>   — get all habits for a user
habitRouter.get('/', habitController.getAllHabits);

// GET /habits/:id             — get a single habit
habitRouter.get('/:id', habitController.getHabitById);

// POST /habits                — create a habit
habitRouter.post('/', habitController.createHabit);

// PATCH /habits/:id           — update title/goal/frequency/completed
habitRouter.patch('/:id', habitController.updateHabit);

// PATCH /habits/:id/complete  — toggle completed
habitRouter.patch('/:id/complete', habitController.toggleComplete);

// DELETE /habits/:id          — delete a habit
habitRouter.delete('/:id', habitController.deleteHabit);

export default habitRouter;
