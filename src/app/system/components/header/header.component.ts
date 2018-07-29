import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../../shared/interface/user';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: IUser;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['sign-in']);
  }

}
