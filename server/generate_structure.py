import os

# Function to create a directory
def create_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

# Function to create a file with some sample content
def create_file(path, content=""):
    with open(path, 'w') as f:
        f.write(content)

# Base directory
base_dir = 'src'

# Directory and file structure
structure = {
    "config": {
        "database.ts": "// Database configuration and connection setup\nexport const dbConfig = {};",
        "app.ts": "// Application-level config (Express app setup)\nexport const appConfig = {};",
        "env.ts": "// Environment variables configuration\nexport const envConfig = {};",
    },
    "common": {
        "middleware": {
            "authMiddleware.ts": "// Authentication middleware\nexport const authMiddleware = (req, res, next) => { next(); };",
            "errorHandler.ts": "// Global error handling middleware\nexport const errorHandler = (err, req, res, next) => { res.status(500).send('Error'); };",
        },
        "utils": {
            "logger.ts": "// Logging utility\nexport const logger = (msg) => { console.log(msg); };",
            "hash.ts": "// Helper for hashing passwords\nexport const hashPassword = (password) => { return password; };",
        }
    },
    "modules": {
        "home": {
            "controllers": {
                "homeController.ts": "// Controller handling home requests\nexport const getHome = (req, res) => { res.send('Home'); };",
            },
            "services": {
                "homeService.ts": "// Business logic for home module\nexport const homeService = () => { return 'Service Logic'; };",
            },
            "models": {
                "homeModel.ts": "// Home model schema\nexport const HomeModel = {};",
            },
            "routes": {
                "homeRoutes.ts": "// Home module API routes\nimport { Router } from 'express';\nconst router = Router();\nrouter.get('/', getHome);\nexport default router;",
            },
            "types": {
                "homeTypes.ts": "// Types for home module\nexport interface HomeType { id: number; name: string; }",
            },
            "tests": {
                "home.test.ts": "// Unit tests for home module\nimport { getHome } from '../controllers/homeController';\ntest('home test', () => { expect(getHome).toBeDefined(); });",
            }
        },
        "employee": {
            "controllers": {
                "employeeController.ts": "// Controller handling employee requests\nexport const getEmployee = (req, res) => { res.send('Employee'); };",
            },
            "services": {
                "employeeService.ts": "// Business logic for employee module\nexport const employeeService = () => { return 'Employee Service'; };",
            },
            "models": {
                "employeeModel.ts": "// Employee model schema\nexport const EmployeeModel = {};",
            },
            "routes": {
                "employeeRoutes.ts": "// Employee module API routes\nimport { Router } from 'express';\nconst router = Router();\nrouter.get('/', getEmployee);\nexport default router;",
            },
            "types": {
                "employeeTypes.ts": "// Types for employee module\nexport interface EmployeeType { id: number; name: string; }",
            },
            "tests": {
                "employee.test.ts": "// Unit tests for employee module\nimport { getEmployee } from '../controllers/employeeController';\ntest('employee test', () => { expect(getEmployee).toBeDefined(); });",
            }
        }
    },
    "database": {
        "migrations": {},
        "seeders": {},
    },
    "services": {
        "emailService.ts": "// Email service logic\nexport const sendEmail = (to, subject, body) => { return 'Email sent'; };",
        "notificationService.ts": "// Notification service logic\nexport const sendNotification = (userId, message) => { return 'Notification sent'; };",
    },
    "types": {
        "index.ts": "// Shared types for the backend\nexport interface BaseType { id: number; }",
    },
    "tests": {
        "setup.ts": "// Global test setup\nbeforeAll(() => { console.log('Global setup'); });",
    },
    "": {
        "app.ts": "// Main application entry point (Express app setup)\nimport express from 'express';\nconst app = express();\napp.listen(3000);",
        "server.ts": "// Starts the server\nimport app from './app';\napp.listen(3000, () => { console.log('Server running'); });",
    }
}

# Function to recursively create the directory structure and files
def create_structure(base_path, structure):
    for name, content in structure.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            create_dir(path)
            create_structure(path, content)
        else:
            create_file(path, content)

# Generate the file structure
create_structure(base_dir, structure)

print("Folder structure generated successfully.")
