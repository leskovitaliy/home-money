import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../../shared/services/users.service';
import {IUser} from '../../../../shared/interface/user';
import {Message} from '../../../../shared/models/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private fb: FormBuilder,
              private usersService: UsersService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log(this.form);
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((users: IUser) => {
        console.log('users', users);
        const user = users[0];
        if (user) {
          if (user.password === formData.password) {

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
