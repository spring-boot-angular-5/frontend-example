import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public model = new LoginModel();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.userService.authenticate(this.model.email, this.model.password);
  }
}

class LoginModel {
  email: string;
  password: string;
}
