import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LicenseRecog';
  currentYear = new Date().getFullYear();
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthenticationService,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }

  logout() {
    this.dataService.logout().subscribe(
      (response: any) => {
        this.toastr.success(response.message, 'Success');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.toastr.error(`Logout failed. Please try again. ${error}`, 'Error');
      }
    );
  }
}
