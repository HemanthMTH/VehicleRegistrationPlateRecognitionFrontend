import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  onLogin(event: any) {
    event.preventDefault();
    const userData = {
      email: this.email,
      password: this.password,
    };
    this.dataService.login(userData).subscribe(
      (response: any) => {
        console.log(response);
        // Handle successful login
      },
      (error: any) => {
        console.error(error);
        // Display an error message
      }
    );
}

}
