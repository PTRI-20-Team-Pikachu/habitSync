import { NextFunction } from "express";
import { Express } from "express";
import {
    createSession,
    createUser,
    getUser,
    invalidateSession,
  } from '../authentication/src/db/database';


const sessionController = {
    getSession: async(req:Request, res:Response, next: NextFunction) => {
    

        try {
            const { email, password } = req.body;

            const normalizedEmail = typeof email === 'string' ? email.trim() : '';
            const normalizedPassword = typeof password === 'string' ? password.trim() : '';
        
            if (!normalizedEmail || !normalizedPassword) { return next({log: 'error in getSesssion',  status: 400, message: { err: 'email and password required'  } });}
        
            const getUser = (email: string): Promise<DbUser | null> => {

              const result = await pool.query<DbUser>(
                'SELECT user_id, password, email FROM users WHERE email = $1 LIMIT 1',
                [email],
              );
            
              return result.rows[0] ?? null;
            }
        
            if (!user || user.password !== normalizedPassword) {
              return res.status(401).send('Invalid email or password');
            }
        
            const session = createSession(user.email, user.user_id);
        
            // create access token
            const accessToken = signJWT(
              { email: user.email, name: user.user_id, sessionId: session.sessionId },
              '5s',
            );
        
            const refreshToken = signJWT({ sessionId: session.sessionId }, '1y');
        
            // set access token in cookie
            res.cookie('accessToken', accessToken, {
              maxAge: 300000, // 5 minutes
              httpOnly: true,
            });
        
            res.cookie("refreshToken", refreshToken, {
              maxAge: 300000, // 1 year
              httpOnly: true,
            });
            res.locals.session = session;
            return next ()
          } catch (error) {
            console.error('Error creating session', error);
            return res.status(500).send('Failed to create session');
          }
        }



        return next()
    },
    createSession: async(req:Request, res:Response, next: NextFunction) => {
        return next()
    },
    deleteSession: async(req:Request, res:Response, next: NextFunction) => {
        return next()
    }
}