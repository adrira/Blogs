import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm;
  constructor(private apiService: ApiService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/home');
    }
  }

  registerBtn() {
    /*console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      this.apiService.register(this.registerForm.value).subscribe(res => {
        console.log(res.json());
        if (res.json().ok === 1) {
          this.router.navigateByUrl('/login');
        }
      });
    }*/
  }

}
