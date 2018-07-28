import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private isAuthentication = false;

  login() {
    this.isAuthentication = true;
  }

  logout() {
    this.isAuthentication = false;
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAuthentication;
  }
}
