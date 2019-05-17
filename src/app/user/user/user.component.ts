import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { AppUser } from 'src/app/core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  currentUser$: Observable<AppUser>;

  longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
    'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
    'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor' +
    ' in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
    ' sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id ' +
    'est laborum.';

  constructor(private auth: AuthService) {
    this.currentUser$ = this.auth.currUser$;
  }

  ngOnInit() {
  }

}
