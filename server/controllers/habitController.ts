import { Request, Response, NextFunction } from 'express';
import type { CreateHabitBody, UpdateHabitBody } from '../types/habit.types.ts';

// TODO: import your supabase client here once the DB layer is set up
// e.g. import supabase from '../config/supabase.ts';

const habitController = {
  // GET /habits?user_id=<id>
  getAllHabits: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.query;

      if (!user_id || typeof user_id !== 'string') {
        res.status(400).json({ error: 'user_id query param is required' });
        return;
      }

      // TODO: replace with supabase query
      // const { data, error } = await supabase
      //   .from('habits')
      //   .select('*')
      //   .eq('user_id', user_id)
      //   .order('created_at', { ascending: false });
      // if (error) return next({ log: error.message, status: 500, message: { err: error.message } });
      // res.status(200).json(data);

      res.status(200).json([]);
    } catch (err) {
      next(err);
    }
  },

  // GET /habits/:id
  getHabitById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // TODO: replace with supabase query
      // const { data, error } = await supabase
      //   .from('habits')
      //   .select('*')
      //   .eq('id', id)
      //   .single();
      // if (error) return next({ log: error.message, status: 404, message: { err: 'Habit not found' } });
      // res.status(200).json(data);

      res.status(200).json({ id });
    } catch (err) {
      next(err);
    }
  },

  // POST /habits
  // Body: { user_id, title, goal, frequency }
  createHabit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, title, goal, frequency } = req.body as CreateHabitBody;

      if (!user_id || !title || !goal || !frequency) {
        res.status(400).json({ error: 'user_id, title, goal, and frequency are required' });
        return;
      }
      if (!['daily', 'weekly'].includes(frequency)) {
        res.status(400).json({ error: 'frequency must be "daily" or "weekly"' });
        return;
      }

      // TODO: replace with supabase query
      // const { data, error } = await supabase
      //   .from('habits')
      //   .insert({ user_id, title, goal, frequency, completed: false })
      //   .select()
      //   .single();
      // if (error) return next({ log: error.message, status: 500, message: { err: error.message } });
      // res.status(201).json(data);

      res.status(201).json({ user_id, title, goal, frequency, completed: false });
    } catch (err) {
      next(err);
    }
  },

  // PATCH /habits/:id
  // Body: { title?, goal?, frequency?, completed? }
  updateHabit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updates = req.body as UpdateHabitBody;

      if (updates.frequency && !['daily', 'weekly'].includes(updates.frequency)) {
        res.status(400).json({ error: 'frequency must be "daily" or "weekly"' });
        return;
      }

      // TODO: replace with supabase query
      // const { data, error } = await supabase
      //   .from('habits')
      //   .update(updates)
      //   .eq('id', id)
      //   .select()
      //   .single();
      // if (error) return next({ log: error.message, status: 404, message: { err: 'Habit not found' } });
      // res.status(200).json(data);

      res.status(200).json({ id, ...updates });
    } catch (err) {
      next(err);
    }
  },

  // PATCH /habits/:id/complete — toggles completed
  toggleComplete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // TODO: replace with supabase query (fetch current state, then toggle)
      // const { data: existing, error: fetchError } = await supabase
      //   .from('habits').select('completed').eq('id', id).single();
      // if (fetchError) return next({ log: fetchError.message, status: 404, message: { err: 'Habit not found' } });
      // const { data, error } = await supabase
      //   .from('habits').update({ completed: !existing.completed }).eq('id', id).select().single();
      // if (error) return next({ log: error.message, status: 500, message: { err: error.message } });
      // res.status(200).json(data);

      res.status(200).json({ id, completed: true });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /habits/:id
  deleteHabit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // TODO: replace with supabase query
      // const { error } = await supabase.from('habits').delete().eq('id', id);
      // if (error) return next({ log: error.message, status: 404, message: { err: 'Habit not found' } });

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

export default habitController;
