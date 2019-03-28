import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { FlexLayoutModule } from '@angular/flex-layout';


const searchRoute: Routes = [
  {
    path: '',
    component: SearchComponent,
    data: { title: 'APP_SEARCH_PAGE' },
  }
];

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(searchRoute)

  ]
})
export class SearchModule { }
