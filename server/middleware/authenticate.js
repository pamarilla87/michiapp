// middleware/authenticate.js
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access Denied / Unauthorized request');
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

export default authenticate;
