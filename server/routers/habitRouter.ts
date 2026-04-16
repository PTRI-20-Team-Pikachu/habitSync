import express from 'express';
import habitController from '../controllers/habitController.ts';

const habitRouter = express.Router();

habitRouter.get('/', habitController.getAllHabits, (req, res) => {
    res.status(200).json(res.locals.habits);
});

habitRouter.get('/:id', habitController.getHabitById, (req, res) => {
    res.status(200).json(res.locals.habitsById);
});

habitRouter.post('/', habitController.createHabit, (req, res) => {
    res.status(201).json(res.locals.habit)
});

// // PATCH /habits/:id           — update title/goal/frequency/completed
// habitRouter.patch('/:id', habitController.updateHabit, (req, res) => {});

// // PATCH /habits/:id/complete  — toggle completed
// habitRouter.patch('/:id/complete', habitController.toggleComplete, (req, res) => {});

habitRouter.delete('/:id', habitController.deleteHabit, (req, res) => {
    res.status(204).send({message:'habit was delted'});
});

export default habitRouter;
