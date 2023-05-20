import { Component } from '@angular/core';
import {PangolinService} from "../shared/pangolin.service";
import {HotToastService} from "@ngneat/hot-toast";
import { Pangolin } from '../shared/pangolin.model';

@Component({
  selector: 'app-pangolin-form',
  templateUrl: './pangolin-form.component.html',
  styleUrls: ['./pangolin-form.component.scss']
})
export class PangolinFormComponent {

  constructor(public service:PangolinService, private toastr:HotToastService) { }

  protected readonly onsubmit = onsubmit;

  submitted : boolean = false;


  onSubmit() {
    this.submitted = true;
    if(this.service.pangolinForm.valid) {
      // debugger;
      if(this.service.pangolinForm.get('_id')?.value == "")
   this.service.postPangolin().subscribe(
      res => {
        this.service.fetchPangolinsList();
        this.toastr.success('Submitted successfully', {
          duration: 2000,
        });
        this.resetForm();
      })
      else
        this.service.putPangolin().subscribe(
          res => {
            
            this.service.fetchPangolinsList();
            this.toastr.info('Submitted successfully', {
              duration: 2000,
            });
            this.resetForm();
            
          })

    }
  }
  resetForm() {
    this.service.pangolinForm.reset(new Pangolin());
    this.submitted = false;
  }
}
