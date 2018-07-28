import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../../shared/services/users.service';
import {IUser} from '../../../../shared/interface/user';
import {Message} from '../../../../shared/models/message';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private fb: FormBuilder,
              private usersService: UsersService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.message = new Message('danger', '');
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
            // this.router.navigate(['']);
          } else {
            this._showMessage('Password incorrect');
          }
        } else {
          this._showMessage('Such user does not exist');
        }
      });
  }

  private _showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

}
