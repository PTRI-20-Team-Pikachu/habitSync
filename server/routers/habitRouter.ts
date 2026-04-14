import express from 'express';
import habitController from '../controllers/habitController.ts';

const habitRouter = express.Router();

// GET /habits?user_id=<id>   — get all habits for a user
habitRouter.get('/', habitController.getAllHabits, (req, res) => {
    res.status(200).json(res.locals.habits);
});

// // GET /habits/:id             — get a single habit
// habitRouter.get('/:id', habitController.getHabitById, (req, res) => {});

// // POST /habits                — create a habit
habitRouter.post('/', habitController.createHabit, (req, res) => {
    res.status(201).json(res.locals.habit)
});

// // PATCH /habits/:id           — update title/goal/frequency/completed
// habitRouter.patch('/:id', habitController.updateHabit, (req, res) => {});

// // PATCH /habits/:id/complete  — toggle completed
// habitRouter.patch('/:id/complete', habitController.toggleComplete, (req, res) => {});

// // DELETE /habits/:id          — delete a habit
// habitRouter.delete('/:id', habitController.deleteHabit, (req, res) => {});

export default habitRouter;
