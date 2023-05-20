import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {Pangolin} from "./pangolin.model";

@Injectable({
  providedIn: 'root'
})
export class PangolinService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }

  readonly baseURL = 'http://localhost:3000/api/';
  list:Pangolin[] = [];

  pangolinForm = this.fb.group({
    _id: [''],
    fullName: ['',Validators.required],
    role: ['',Validators.required],
    city: ['']
  })

  fetchPangolinsList() {
    this.http.get(this.baseURL)
      .pipe(catchError(this.errorHandler))
      .subscribe(
        res => {
          this.list = res as Pangolin[];
          // console.log(this.list);
        });
  }
  postPangolin(){
    return this.http.post(this.baseURL, this.pangolinForm.value)
      .pipe(catchError(this.errorHandler));
  }

  putPangolin() {
    return this.http.put(this.baseURL + this.pangolinForm.get('_id')?.value, this.pangolinForm.value)
      .pipe(catchError(this.errorHandler));
  }

  deletePangolin(_id: string) {
    return this.http.delete(this.baseURL + _id)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
   if(error.status === 0) {
      console.error('An error occurred:', error.error);
} else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
   }
    return throwError(() => {
      console.error('Something bad happened; please try again later.');
    });
  }
}


