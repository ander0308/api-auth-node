import { Request, Response, NextFunction} from 'express'

export const Auth = {
    private: ( req: Request, res: Response, next: NextFunction) => {
        // Fazer verificação de auth
        let success: Boolean = false

        if(success){
            next()
        } else {
            res.status(403) // Status Not authorized
            res.json({error: 'Não autorizado!'})
        }

    },



    public: () => {

    },
    liberado: () => {

    }
}