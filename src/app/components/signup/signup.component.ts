import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public username: string = '';
  public email: string = '';
  public password: string = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  onSignup(event: any): void {
    event.preventDefault();
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    this.dataService.signup(userData).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Successfully signed up! Redirecting...', 'Success');
        setTimeout(() => {
          this.router.navigate(['/login']); // Assuming '/login' is your login route
        }, 1500);
      },
      (error: any) => {
        console.error(error);
        this.toastr.error('Signup failed. Please try again.', 'Error');
      }
    );
  }
  
}
