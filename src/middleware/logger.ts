import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
    if(!req.originalUrl.includes("api") && false) {
        return next()
    }
    const today = new Date()
    console.log(`${today.toISOString()}  ${req.method}  ${req.originalUrl}`)
    next()
}
export { logger }