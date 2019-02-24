import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [ListComponent, DetailComponent, ManageComponent],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
