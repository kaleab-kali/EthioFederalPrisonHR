import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Employee from "../../employee/models/employeeModel";
import Center from "../../centers/models/centerModel";

interface UserPayload {
  centerName?: string;
  role: string;
  isHQ?: boolean;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export async function verifyAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

      // Query the Employee to get the centerName and role
      const employee = await Employee.findById(decoded.id);
      console.log(decoded.id);
  
      if (!employee) {
        res.status(403).json({ message: "Unauthorized: User not found" });
        return;
      }
  
    // Get centerName for non-HQ users
        let centerName = undefined;
        if (decoded.role !== "hq-admin") {
           centerName = employee.centerName;
         }
  
      // Attach the user details along with the resolved centerId to the request object
      req.user = {
        id: employee._id.toString(),
        centerName,
        role: employee.role,
        isHQ: decoded.role === "hq-admin",  // Directly use the role to determine if HQ
      };
  
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token", error });
    }
  }
