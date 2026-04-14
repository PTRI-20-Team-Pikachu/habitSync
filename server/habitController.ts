import { Express, NextFunction, RequestHandler } from "express";
import { get } from "node:http";

interface habitController {
    postHabit: RequestHandler,
    getHabits: RequestHandler,
    updateHabit: RequestHandler,
    delteHabit: RequestHandler
}

const habitController = {
    const {id, user, created_at} = req.body;
    postHabit: async(req:Request, res:Response, next:NextFunction) => {
        try {
            return next ({
                log: 'missing required info',
                status: 400 ,
                message: {err:'entry and username are required'}
            })
        } catch (err) { 
            return next ({
                log: 'missing required info',
                status: 400 ,
                message: {err:'entry and username are required'}
            })
        }
    },
    //user id- 
    // getHabits: async(req:Request, res:Response, next:NextFunction) => {},
    // updateHabit: async(req:Request, res:Response, next:NextFunction) => {},
    // deleteHabit:async(req:Request, res:Response, next:NextFunction) => {}

}
export default habitController 

// export type HabitFrequency = 'daily' | 'weekly';

// export type Habit = {
//   id: string; - id of habit
//   title: string; title of habbit
//   goal: string; user could define a main goal and that goal could have sub class so that could be a habit to acheieve the goal
//   frequency: HabitFrequency;
//   completed: boolean;
// };

// export type UpdateHabitValues = {
//   title: string;
//   goal: string;
//   frequency: HabitFrequency;
// };