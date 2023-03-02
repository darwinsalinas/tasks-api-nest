import { hashPasswordSync } from '../../common/helpers/hash-password.helper';
interface SeedUser {
    email: string;
    fullName: string;
    password: string;
    roles: string[];
}


interface SeedData {
    users: SeedUser[];
}


export const initialData: SeedData = {
    users: [
        {
            email: 'admin@gmail.com',
            fullName: 'Test One',
            password: hashPasswordSync('secret'),
            roles: ['admin']
        },
        {
            email: 'user1@gmail.com',
            fullName: 'User Test Two',
            password: hashPasswordSync('secret'),
            roles: ['user',]
        },
        {
            email: 'user2@gmail.com',
            fullName: 'User Test Three',
            password: hashPasswordSync('secret'),
            roles: ['user',]
        },
        {
            email: 'user4@gmail.com',
            fullName: 'User Test Four',
            password: hashPasswordSync('secret'),
            roles: ['user',]
        },
        {
            email: 'user5@gmail.com',
            fullName: 'User Test Five',
            password: hashPasswordSync('secret'),
            roles: ['user',]
        },
        {
            email: 'user6@gmail.com',
            fullName: 'User Test Six',
            password: hashPasswordSync('secret'),
            roles: ['user',]
        },
    ],
}