import { Request, Response, NextFunction } from "express";

export function validateUserContext(req: Request, res: Response, next: NextFunction): void {
    try {
      if (!req.user) {
         res.status(403).json({ message: "User information is missing" });
         return
      }
  
     
      const isHQ = !req.user.centerName || req.user.role === "hq-admin";
  
      req.user.isHQ = isHQ;
  
      next();
    } catch (error) {
      res.status(500).json({ message: "Failed to validate user context", error });
    }
  }
  

