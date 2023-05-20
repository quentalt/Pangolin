import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
form: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastr:HotToastService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName: '',
      email: '',
      password: ''
});
  }

  ValidateEmail(mail: string): boolean {
    const validRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

   if(!!mail.match(validRegex))
     return false;
   else
     return true;
  }

  submit(): void {
    let user = this.form.getRawValue();

    if (user.fullName == "" || user.email == "" || user.password == "") {
      this.toastr.error('Please fill all the fields');
    } else if (this.ValidateEmail(user.email)) {
      this.toastr.error('Please enter a valid email');
    } else {
      this.http.post('http://localhost:3000/api/login', user, {
        withCredentials: true
      }).subscribe((res: any) => {
          this.router.navigate(['/profile']).then(r => this.toastr.success('User logged in successfully'));
        }, (err: any) => {
          this.toastr.error('Invalid credentials');
        });
    }
  }
  }
