import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';


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
    RouterModule.forChild(searchRoute)

  ]
})
export class SearchModule { }
