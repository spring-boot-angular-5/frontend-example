import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user/user.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.userService.currentUser
      .flatMap(o => o)
      .map(user => !!user)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['login']);
        }
      });
  }

}
