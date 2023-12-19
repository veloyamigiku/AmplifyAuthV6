import { Amplify } from 'aws-amplify';
import * as rl from 'readline';

import configure from './configure.js';
import confirm from './confirm.js';
import user_session from './user_session.js';
import signin from './signin.js';
import signup from './signup.js';
import singout from './singout.js';

configure();
const currentConfig = Amplify.getConfig();

function readUserInput(question) {

  const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    readline.question(
      question,
      (answer) => {
        resolve(answer);
        readline.close();
      }
    );
  });
}

const config = `
[config]=====================
  IDプールID: ${currentConfig.Auth.Cognito.identityPoolId}
  ユーザプールID: ${currentConfig.Auth.Cognito.userPoolId}
  ユーザプールクライアントID: ${currentConfig.Auth.Cognito.userPoolClientId}
=============================`;

const menu = `
[menu]=====================
  1.サインアップ
  2.サインイン
  3.サインアウト
===========================
実行するアクションの番号を入力してください:`;

(async function main() {
  while (true) {

    console.log(config);
    
    const { currentAuthUser, currentUserAttrs, session } = await user_session();
    if (currentAuthUser && currentUserAttrs && session) {
      const currentAuthUserSession = `
[session]=====================
ユーザ名: ${currentAuthUser.username}
メールアドレス: ${currentUserAttrs.email}
アクセストークン:  ${session.tokens.accessToken}
アクセストークン期限: ${session.tokens.accessToken.payload.exp}
IDトークン: ${session.tokens.idToken}
IDトークン期限: ${session.tokens.idToken.payload.exp}
==============================`;
      console.log(currentAuthUserSession);
    }

    const actionId = parseInt(await readUserInput(menu));

    switch (actionId) {
      case 1:
        await execSignup();
        break;
      case 2:
        await execSignin();
        break;
      case 3:
        await execSignOut();
        break;
      case 0:
        console.log('end');
        return;
      default:
        break;
    }
  }
})();

async function execSignup() {
  console.log('登録するユーザ情報を入力してください。');
  const username = await readUserInput('ユーザ名:');
  const password = await readUserInput('パスワード:');
  const user = await signup(
      username,
      password);
  if (!user) {
      return;
  }
  console.log('確認コードを入力してください。');
  const code = await readUserInput('コード:');
  const confirmRes = await confirm(
      username,
      code);
  if (confirmRes) {
      console.log('登録完了');
  }
  
}

async function execSignin() {
  console.log('ユーザ情報を入力してください。');
  const username = await readUserInput('ユーザ名:');
  const password = await readUserInput('パスワード:');
  const user = await signin(
      username,
      password);
  if (user) {
      console.log('サインイン成功');
  }
}

async function execSignOut() {
  await singout();
}