import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('signup');
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.dataService.signup(userData).subscribe(
        (response: any) => {
          console.log(response);
          this.toastr.success(`${response.message}`, 'Success');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(`Signup failed. Please try again. ${error.error.error}`, 'Error');
        }
      );
    } else {
      this.toastr.error('Please fill out all fields correctly.', 'Error');
    }
  }
}
