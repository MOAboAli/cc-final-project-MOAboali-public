import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordService } from '../_classes/PasswordService';
import { CommonModule } from '@angular/common';
import { MainservicesService } from '../_services/mainservices.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  userdata: userdata | null = null;
  loginForm: FormGroup;
  _MainservicesService = inject(MainservicesService);
  message: string = "";
  messagestatus: string = "text-danger";
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder, private passwordService: PasswordService) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });

    const userString = localStorage.getItem("user");
    if (!userString) return;
    this.userdata = JSON.parse(userString);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData2 = {
        'email': this.loginForm.get('email')?.value,
        'password': this.loginForm.get('password')?.value//this.passwordService.hashPassword(this.loginForm.get('password')?.value),
      }
      this._MainservicesService.login(formData2).subscribe({
        next: async (response) => {
          this.userdata = new userdata(response.Item);
          localStorage.setItem("user", JSON.stringify(this.userdata));
          this.router.navigateByUrl('/')
        },
        error: (error) => {
          this.message = 'Login failed: ' + error.error.error;
          console.error('Login failed: ', error);
          this.messagestatus = "text-danger";
        }
      });
    }
  }

}
export class userdata {

  email: string = "";
  password: string = "";
  bio: string = "";
  name: string = "";
  imageUrl: string = "";
  datetime: string = "";

  constructor(userobject: any) {
    this.email = userobject.email.S;
    this.password = userobject.password.S;
    this.bio = userobject.bio.S;
    this.name = userobject.name.S;
    this.imageUrl = userobject.imageUrl.S;
    this.datetime = userobject.datetime.S;
  }

}
