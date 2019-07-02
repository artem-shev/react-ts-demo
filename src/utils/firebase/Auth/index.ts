import * as firebase from 'firebase';

export default class AuthManager {
  constructor(private auth: firebase.auth.Auth) {}

  createUser(email: string, psw: string) {
    return this.auth.createUserWithEmailAndPassword(email, psw);
  }

  signIn(email: string, psw: string) {
    return this.auth.signInWithEmailAndPassword(email, psw);
  }

  signOut() {
    return this.auth.signOut();
  }
}
