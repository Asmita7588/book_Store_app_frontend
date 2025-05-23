import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  login!: FormGroup;
  signup!: FormGroup;
  submitted = false;
  isLogin = true;
  isSignUp = true;
  isLoading = false;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  constructor(
    private formBuilder: FormBuilder,
     private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
   
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

   
    this.signup = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Login Method
  onlogin(): void {
     this.isLoading = true;
    this.submitted = true;

    if (this.login.invalid) return;

    const loginData = this.login.value;

    this.userService.login(loginData).subscribe(
      (response: any) => {
        this.isLoading = false;
        console.log('Login successful', response);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        this.snackbar.open('Login successful!', 'close', { duration: 3000, panelClass: ['snackbar-success'] });
         this.router.navigateByUrl('/dashboard/books');
      },
      (error) => {
       this.isLoading = false;
        console.log('Login error:', error);
        this.snackbar.open('Login failed. Please try again.', 'close', { duration: 3000,panelClass: ['snackbar-error'] });
      }
    );
  }

  // Signup Method
  onsignup(): void {
    this.submitted = true;

    if (this.signup.invalid) return;

    const signupData = this.signup.value;

    this.userService.signUp(signupData).subscribe(
      (response: any) => {
        console.log('Signup successful', response);
        this.snackbar.open('Signup successful!', '', { duration: 3000, panelClass: ['snackbar-success'] });
        this.signup.reset(); 
      },
      (error) => {
        console.log('Signup error:', error);
        this.snackbar.open('Signup failed. Please try again.', '', { duration: 3000, panelClass: ['snackbar-error'] });
      }
    );
  }

}
