import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toastr: HotToastService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName: '',
      email: '',
      password: ''
    });
  }

  ValidateEmail(mail: string): boolean {
    const validRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

    if (!!mail.match(validRegex))
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
    }
    else {
      this.http.post('http://localhost:3000/api/register', user, {
        withCredentials: true
      }).subscribe((response) => {
        this.router.navigate(['/login']).then(r => this.toastr.success('User registered successfully'));
      }, (error) => {
        this.toastr.error('User already exists');
      });
    }
  }
}

