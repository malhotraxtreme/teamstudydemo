import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsViewComponent } from './details-view/details-view.component';
import { ApiService } from '../app/api.service';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'note/:id', component: DetailsViewComponent },
  { path: 'note', component: DetailsViewComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DetailsViewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    QuillModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
