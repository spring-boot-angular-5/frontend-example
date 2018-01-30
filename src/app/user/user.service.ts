import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {
  readonly currentUser: Subject<Observable<any>> = new BehaviorSubject(this.getCurrentUser());

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  authenticate(email: string, password: string) {
    this.httpClient.post<void>('/api/login', {email, password}, {observe: 'response'})
      .subscribe(res => {
        localStorage.authToken = res.headers.get('Authorization');
        this.getCurrentUser()
          .subscribe(user => {
            this.currentUser.next(Observable.of(user));
            this.router.navigate(['profile']);
          });
      }, error => {
        if (error.status === 401) {
          alert('Email not found or password is invalid.');
        }
      });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.currentUser.next(Observable.of(null));
  }

  private getCurrentUser() {
    return this.httpClient.get<object>('/api/users/current');
  }
}
