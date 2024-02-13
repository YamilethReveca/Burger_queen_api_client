import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocinaComponent } from './cocina/cocina.component';
import { FormsModule } from '@angular/forms'
import { AuthGuard } from '../auth.guard';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes=[
  { path: '', component: CocinaComponent}, 
]

@NgModule({
  declarations: [
    CocinaComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CocinaModule { }
