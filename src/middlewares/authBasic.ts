import { Request, Response, NextFunction} from 'express'
import { User } from '../models/User'

export const Auth = {
    private: async ( req: Request, res: Response, next: NextFunction) => {
        let success: boolean = false
        
        // Fazer verificação de auth
        if(req.headers.authorization) {
            let hash: string = req.headers.authorization.substring(6)
            let decoded: string = Buffer.from(hash, 'base64').toString()
            let data: string[] = decoded.split(':')

            if(data.length === 2) {
                let hasUser = await User.findOne({
                    where: {
                        email: data[0],
                        password: data[1]
                    }
                })
                if(hasUser){
                    success = true
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