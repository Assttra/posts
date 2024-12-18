export class UserTokenStorage {
  TOKEN = 'auth-token'

   setToken(token: string) {
     return localStorage.setItem(this.TOKEN, token);
   }

   getToken() {
    return localStorage.getItem(this.TOKEN);
   }

}
