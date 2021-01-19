import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateUserService from '../services/CreateUserService';

const usersRoute = Router();

usersRoute.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password});

        delete user.password;

        return response.json(user);
    } catch (error) {
        // console.log(error);
        return response.status(400).json({ error: error.message });
    }
});

export default usersRoute;
