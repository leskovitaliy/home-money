import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IUser } from '../../../../shared/interface/user';
import { UsersService } from '../../../../shared/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private usersService: UsersService,
              private router: Router,
              private title: Title) {

  }

  ngOnInit() {
    this.title.setTitle('Sign Up');

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], this.forbiddenEmails.bind(this)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      agree: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit() {
    console.log('submit sign up', this.form.value);
    const { email, password, name } = this.form.value;
    const user = { email, password, name };

    this.usersService.createNewUser(user)
      .subscribe(() => {
        console.log(user);
        this.router.navigate(['/sign-in'], {
          queryParams: {
            nowCanLogin: true
          }
        });
      });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: IUser) => {
          if (user && user[0] && user[0].email === control.value) {
            resolve({ forbiddenEmail: true });
          } else {
            return resolve(null);
          }
        });
    });
  }

}
