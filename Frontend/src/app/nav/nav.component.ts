import {Component, OnInit} from '@angular/core';
import {Emitters} from "../emitters/emitter";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  authenticated = false;

  constructor(
    private http: HttpClient) {

  }

  ngOnInit(): void {
   Emitters.authEmitter.subscribe(
      (auth:boolean) => {
        this.authenticated = auth;
      })
  }

  logout() {
    this.http.post('http://localhost:3000/api/logout', {}, {
      withCredentials: true
    }).subscribe(() => this.authenticated = false);
    }
}
