import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMessage } from '../../../../shared/interface/message';
import { UsersService } from '../../../../shared/services/users.service';
import { IUser } from '../../../../shared/interface/user';
import { AuthService } from '../../../../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  message: IMessage = { text: '', type: 'danger' };

  constructor(private fb: FormBuilder,
              private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this._showMessage({text: 'Now you can sign in', type: 'success'});
        } else if (params['accessDenied']) {
          this._showMessage({text: 'To work with the system you need to login', type: 'warning'});
        }
      });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log(this.form);  // TODO remove console.log
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((users: IUser) => {
        console.log('users', users); // TODO remove console.log
        const user = users[0];
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this._showMessage({text: 'Password incorrect', type: 'danger'});
          }
        } else {
          this._showMessage({text: 'Such user does not exist', type: 'danger'});
        }
      });
  }

  private _showMessage(message: IMessage) {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

}
