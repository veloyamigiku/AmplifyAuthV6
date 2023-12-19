import { fetchAuthSession } from 'aws-amplify/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';

export default async function () {

  let currentAuthUser = null;
  let currentUserAttrs = null;
  let session = null;
  try {
    const tmpCurrentAuthUser = await getCurrentUser();
    currentAuthUser = tmpCurrentAuthUser;
    const tmpCurrentUserAttrs = await fetchUserAttributes();
    currentUserAttrs = tmpCurrentUserAttrs;
    const tmpSession = await fetchAuthSession();
    session = tmpSession;
    if (session) {
      if (session.isValid()) {
        console.log('セッションが有効です。');
      } else {
        console.log('セッションが無効です。');
      }
    } else {
      console.log('セッションが無効です。');
    }
  } catch (error) {
    console.warn(error);
  }

  return { currentAuthUser, currentUserAttrs, session };

}