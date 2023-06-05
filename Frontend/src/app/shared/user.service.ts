import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { UserToken } from './user-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenSubject: BehaviorSubject<UserToken>;
  public token: Observable<UserToken>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.tokenSubject = new BehaviorSubject<UserToken>(JSON.parse(
      localStorage.getItem('RANDOM_TOKEN_SECRET')!));
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue(): UserToken {
    return this.tokenSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<UserToken>(`http://localhost:3000/api/auth/login`, {email, password})
      .pipe(
        map(token => {
          const userToken: UserToken = token;

          localStorage.setItem('RANDOM_TOKEN_SECRET', JSON.stringify(userToken));
          this.tokenSubject.next(userToken);

          return userToken;
        })
      );
  }

  logout() {
    localStorage.removeItem('RANDOM_TOKEN_SECRET');
    this.tokenSubject.next(null!);
    this.router.navigate(['/']).then(r => console.log(r));
  }
}
