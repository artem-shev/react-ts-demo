class AuthService {
  isAuthorized = false;

  authorize() {
    this.isAuthorized = true;
  }
}

export default AuthService;
