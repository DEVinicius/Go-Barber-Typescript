//Import UserRepository and UserModel
import User from '../models/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password } : Request): Promise<User> {
        const userRepository = getRepository(User);
        
        const checkMailExists = await userRepository.findOne({
            where: {
                email
            }
        });

        if(checkMailExists) {
            throw new Error('Email address already used');
        }

        //send data to database
        const hashedPassword = await hash(password, 8);

        const user = await userRepository.create({
            name, email, 
            password: hashedPassword
        });

        await userRepository.save(user);

        return user;
    } 

}

export default CreateUserService;