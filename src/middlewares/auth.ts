import { Request, Response, NextFunction} from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User'

dotenv.config()

export const Auth = {
    private: async ( req: Request, res: Response, next: NextFunction) => {
        let success: boolean = false
        
        // Fazer verificação de auth
        if(req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ')
            if(authType === 'Bearer') {
                try {
                    JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    )
                    success = true
                } catch(error) {

                }
            }
        }
        
        if(success){
            next()
        } else {
            res.status(403) // Status Not authorized
            res.json({error: 'Não autorizado!'})
        }

    }
}