//Import UserRepository and UserModel
import User from '../models/User';
import { getRepository } from 'typeorm';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password } : Request): Promise<User> {
        const userRepository = getRepository(User);
        
        const checkMailExists = userRepository.findOne({
            where: {
                email
            }
        });

        if(checkMailExists) {
            throw new Error('Email address already used');
        }

        //send data to database
        // const password_crypt = 

        const user = await userRepository.create({
            name, email, 
            password: password
        });

        await userRepository.save(user);

        return user;
    } 

}

export default CreateUserService;