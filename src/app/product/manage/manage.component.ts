import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/core/dialog.service';
import { Fooditem } from 'src/app/core/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  fooditem: Fooditem;
  constructor(
    private dialogService: DialogService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.fooditem = this.route.snapshot.data.product;
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.dialogService.openDialog('Discard Changes?');
  }
}
