import { signUp } from "aws-amplify/auth";

export default async function(
    username,
    password) {
    
    let new_user = null;
    try {
      const user = await signUp({
        username: username,
        password: password
      });
      new_user = user;
    } catch (error) {
      console.log(error);
    }
  
    return new_user;
  
  };
  