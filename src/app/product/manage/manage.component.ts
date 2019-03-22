import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/core/dialog.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  ngOnInit() {}

  canDeactivate(): Observable<boolean> | boolean {
    return this.dialogService.openDialog('Discard Changes?');
  }
}
