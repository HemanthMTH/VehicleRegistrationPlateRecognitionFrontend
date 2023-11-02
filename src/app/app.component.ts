import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LicenseRecog';
  currentYear = new Date().getFullYear();
  isLoggedIn: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.dataService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
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
