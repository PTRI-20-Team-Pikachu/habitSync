import express from 'express';
import habitController from '../controllers/habit.controller.ts';

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

habitRouter.patch('/:id', habitController.updateHabit, (req, res) =>{
    res.status(204).send({message: 'habit was updated'})
});
habitRouter.patch('/:id/complete', habitController.toggleComplete, (req, res) => {
    res.status(200)
});

habitRouter.delete('/:id', habitController.deleteHabit, (req, res) => {
    res.status(204).send({message:'habit was delted'});
});

export default habitRouter;
