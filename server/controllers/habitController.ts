import { Request, Response, NextFunction } from 'express';
import type { CreateHabitBody, UpdateHabitBody } from '../types/habit.types.ts';
import { supabase } from '../supabaseClient.ts';

const habitController = {
  getAllHabits: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.query;
        if (!user_id || typeof user_id !== 'string') {
          return next({log: 'userId invalid entry', status:400, message: {err: 'userid entry bad'} });
        }
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false });
        if (error) {return next({log: error.message,  status: 500, message: { err: error.message } });}
        res.locals.habits = data;
        return next()
    } catch (err) {
      return next({
        log: 'error in getAllHabits',
        status: 500,
        message: {err: 'error message'}
      });
    }
  },
  getHabitById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {return next({ log: error.message, status: 404, message: { err: 'Habit not found' } });}
      res.locals.habitsById = data;
      return next ()
    } catch (err) {
      next(err);
    }
    return  next({
      log: 'error in getHabitById',
      status: 500,
      message: {err: 'error possibly bad id?'}
    })
  },
  createHabit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, title, goal, frequency } = req.body;
      if (!user_id || !title || !goal || !frequency) {
        res.status(400).json({ error: 'user_id, title, goal, and frequency are required' });
        return;
      }
      if (!['daily', 'weekly'].includes(frequency)) {
        res.status(400).json({ error: 'frequency must be "daily" or "weekly"' });
        return;
      }
      const { data, error } = await supabase
        .from('habits')
        .insert( { user_id, title, goal, frequency, completed: false })
        .select()

      if (error) { return next({ log: error.message, status: 500, message: { err: error.message } }); }
      res.locals.habit = data;
      return next();      
    } catch (err) {
      return next({
        log: 'error in postHabit',
        status: 400,
        message: {err: 'error message'}
      });
    }
  },
  // },

//   // PATCH /habits/:id
//   // Body: { title?, goal?, frequency?, completed? }
//   updateHabit: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id } = req.params;
//       const updates = req.body as UpdateHabitBody;

//       if (updates.frequency && !['daily', 'weekly'].includes(updates.frequency)) {
//         res.status(400).json({ error: 'frequency must be "daily" or "weekly"' });
//         return;
//       }

//       // TODO: replace with supabase query
//       // const { data, error } = await supabase
//       //   .from('habits')
//       //   .update(updates)
//       //   .eq('id', id)
//       //   .select()
//       //   .single();
//       // if (error) return next({ log: error.message, status: 404, message: { err: 'Habit not found' } });
//       // res.status(200).json(data);

//       res.status(200).json({ id, ...updates });
//     } catch (err) {
//       next(err);
//     }
//   },

//   // PATCH /habits/:id/complete — toggles completed
//   toggleComplete: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id } = req.params;

//       // TODO: replace with supabase query (fetch current state, then toggle)
//       // const { data: existing, error: fetchError } = await supabase
//       //   .from('habits').select('completed').eq('id', id).single();
//       // if (fetchError) return next({ log: fetchError.message, status: 404, message: { err: 'Habit not found' } });
//       // const { data, error } = await supabase
//       //   .from('habits').update({ completed: !existing.completed }).eq('id', id).select().single();
//       // if (error) return next({ log: error.message, status: 500, message: { err: error.message } });
//       // res.status(200).json(data);

//       res.status(200).json({ id, completed: true });
//     } catch (err) {
//       next(err);
//     }
//   },

//   // DELETE /habits/:id
  deleteHabit: async (req: Request, res: Response, next: NextFunction) => {
    try {

      console.log('are you logged in?  are you allowed to deelte?')

      const { id } = req.params;
      const { error } = await supabase.from('habits').delete().eq('id', id);
      if (error) return next({ log: error.message, status: 404, message: { err: 'Habit not found' } });

      
    } catch (err) {
      next(err);
    }
  },
};

export default habitController;
