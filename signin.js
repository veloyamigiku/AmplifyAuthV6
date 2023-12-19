import { signIn } from 'aws-amplify/auth';

export default async function(
    username,
    password) {
    
    let signin_user = null;
    try {
        const user = await signIn({
            username: username,
            password: password
        });
        signin_user = user;
    } catch (error) {
        console.log('error signing in/out:', error);
    }

    return signin_user;
};
