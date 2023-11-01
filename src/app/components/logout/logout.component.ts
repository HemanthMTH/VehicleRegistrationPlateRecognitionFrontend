import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-logout',
  template: '',  // No need for a template
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.logoutUser();
  }

  logoutUser() {
    this.dataService.logout().subscribe(
      (response: any) => {
        this.toastr.success(response.message, 'Success');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.toastr.error('Logout failed. Please try again.', 'Error');
      }
    );
  }
}
