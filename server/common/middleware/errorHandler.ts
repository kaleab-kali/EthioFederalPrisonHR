// Global error handling middleware
export const errorHandler = (err, req, res, next) => { res.status(500).send('Error'); };