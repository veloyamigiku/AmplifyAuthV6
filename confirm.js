import { confirmSignUp } from 'aws-amplify/auth';

export default async function(
    username,
    code) {
    
    let res = null;
    try {
      const tmp_res = await confirmSignUp({
        username: username,
        confirmationCode: code
      });
      res = tmp_res;
    } catch (error) {
      console.log(error);
    }
  
    return res;
  
  }
  