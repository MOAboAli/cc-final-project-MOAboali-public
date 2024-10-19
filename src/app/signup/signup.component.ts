import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainservicesService } from '../_services/mainservices.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PasswordService } from '../_classes/PasswordService';
import { userdata } from '../home/home.component';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  userdata: userdata | null = null;
  signupForm: FormGroup;
  selectedImage: File | null = null;
  message: string = "";
  _MainservicesService = inject(MainservicesService);
  messagestatus: string = "";
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder, private passwordService: PasswordService) {

    const userString = localStorage.getItem("user");
    if (userString) {
      this.userdata = JSON.parse(userString);
      this.signupForm = this.formBuilder.group({
        name: [this.userdata?.name, Validators.required],
        email: [this.userdata?.email, [Validators.required, Validators.email]],
        password: [this.userdata?.password, [Validators.required, Validators.minLength(6)]],
        bio: [this.userdata?.bio],
        image: [null]
      });
    }
    else {

      this.signupForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        bio: [''],
        image: [null]
      });
    }


  }

  onImageChange(event: any) {
    console.log("Image changed");
    const file = event.target.files[0];

    if (file) {
      this.selectedImage = file;
      //this.signupForm.patchValue({ image: file });
    }
  }

  onSubmit() {
    if (this.signupForm.valid && this.selectedImage) {
      const formData2 = {
        'name': this.signupForm.get('name')?.value,
        'email': this.signupForm.get('email')?.value,
        'password': this.signupForm.get('password')?.value,//this.passwordService.hashPassword(this.signupForm.get('password')?.value),
        'bio': this.signupForm.get('bio')?.value,
        'filename': this.selectedImage.name,
        'contentType': this.selectedImage.type
      }

      this._MainservicesService.signup(formData2).subscribe({
        next: async (response) => {
          this._MainservicesService.uploadfile(this.selectedImage!, response.uploadURL);
          this.message = 'Sign up finished, Page will redirect in 3 seconds.';
          this.messagestatus = "text-success";
          localStorage.removeItem("user");
          this.userdata = null;
          this.router.navigateByUrl('/login')
        },
        error: (error) => {
          this.message = 'Signup failed: ' + error.error.error;
          console.error('Signup failed: ', error.error.error);
          this.messagestatus = "text-danger";
        }
      });
    }
    else {
      this.message = 'Signup failed: Sign up Form is invalid';
      console.log("no valid");
      this.messagestatus = "text-danger";
    }








  }
}


