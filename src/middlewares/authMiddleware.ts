import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

const key = process.env.JWT_SECRET || "padrao";

export const autenticarToken = (req: Request, res: Response, 
    next: NextFunction) => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        
        if (!token) { 
            res.status(401).send(
                {
                    message: "Token não fornecido!"
                }
            );

            return;
        }

        try {
            const decoded = Jwt.verify(token, key);
            (req as any).usuario = decoded;
            next();
        } catch (err) {
            res.status(403).send(
                {
                    message: "Token inválido ou expirado!"
                }
            )
        }

    }
