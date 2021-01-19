import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRoute = Router();

sessionsRoute.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const { user, token } = await authenticateUserService.execute({
            email, 
            password
        });

        delete user.password;

        return response.json({user, token});
    } catch (error) {
        // console.log(error);
        return response.status(400).json({ error: error.message });
    }
});

export default sessionsRoute;
