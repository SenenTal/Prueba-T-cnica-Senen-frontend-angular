import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sesion = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(null);

  sesion$ = this.sesion.asObservable();
  user$ = this.userSubject.asObservable();

  constructor() {

    const sesion = localStorage.getItem('sesion');
    const user = localStorage.getItem('user');

    if (sesion === 'true' && user) {

      const parsedUser = JSON.parse(user);

      this.sesion.next(true);
      this.userSubject.next(parsedUser);

    }

  }

  login(user: any) {

    console.log('Login user: ', user);

    const userData = {
      id: user.id,
      nickname: user.nickname,
      username: user.username
    };
    console.log('User data final: ', userData);

    this.sesion.next(true);
    this.userSubject.next(userData);

    localStorage.setItem('sesion', 'true');
    localStorage.setItem('user', JSON.stringify(userData));

  }

  logout() {

    this.sesion.next(false);
    this.userSubject.next(null);

    localStorage.removeItem('sesion');
    localStorage.removeItem('user');

  }

  getUserId() {
    return this.userSubject.value?.id ?? null;
  }
  setUser(user:any){
    this.userSubject.next(user);
    localStorage.setItem('user',JSON.stringify(user));
  }

}