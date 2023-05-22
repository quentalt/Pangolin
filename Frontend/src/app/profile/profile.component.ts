import {Component, OnInit} from '@angular/core';
import {Emitters} from "../emitters/emitter";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  message= '';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/user/', {
      withCredentials: true
    }).subscribe((user: any) => {
        this.message = `Hi ${user.fullName}`;
        Emitters.authEmitter.emit(true);
      }
    );
  }
}
