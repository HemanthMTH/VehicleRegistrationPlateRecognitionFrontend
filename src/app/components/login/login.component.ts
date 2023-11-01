import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe((values) => {
      console.log(values, this.loginForm);
      // You can perform actions based on form changes here
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.dataService.login(userData).subscribe(
        (response: any) => {
          console.log(response);
          this.toastr.success('Successfully logged in.', 'Success')
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Signup failed. Please try again.', 'Error');
        }
      );
    }
  }
}
