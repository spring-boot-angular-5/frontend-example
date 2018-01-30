import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LoginPageComponent} from './auth/login-page/login-page.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {UserModule} from './user/user.module';
import {FormsModule} from "@angular/forms";
import {TokenInterceptor} from "./auth/token.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';


const routes: Routes = [
  {path: '', redirectTo: 'profile', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
