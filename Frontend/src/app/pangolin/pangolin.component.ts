import {Component, OnInit} from '@angular/core';
import {PangolinService} from "../shared/pangolin.service";
import {Pangolin} from "../shared/pangolin.model";
import {HotToastService} from "@ngneat/hot-toast";
@Component({
  selector: 'app-pangolin',
  templateUrl: './pangolin.component.html',
  styleUrls: ['./pangolin.component.scss']
})
export class PangolinComponent implements OnInit {

  constructor(public service: PangolinService, private toastr:HotToastService) {}

  ngOnInit():void {
    this.service.fetchPangolinsList();


  }

  populateForm(selectedRecord: Pangolin) {
    this.service.pangolinForm.setValue({
      _id: selectedRecord._id,
      fullName: selectedRecord.fullName,
      role: selectedRecord.role,
      city: selectedRecord.city

    })
  }

  onDelete(_id: string) {
    if(confirm('Are you sure to delete this record ?'))
this.service.deletePangolin(_id).subscribe(res => {
    this.service.fetchPangolinsList();
    this.toastr.error('Deleted successfully');
    });
  }
}

