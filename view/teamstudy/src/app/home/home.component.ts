import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private notes: Array<any>;
  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.api.getNotes().subscribe((res: Array<any>) => {
      this.notes = res;
    });
  }

}
