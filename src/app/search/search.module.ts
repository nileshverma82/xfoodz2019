import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';


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
    ReactiveFormsModule,
    RouterModule.forChild(searchRoute)

  ]
})
export class SearchModule { }
