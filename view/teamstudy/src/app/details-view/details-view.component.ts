import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as Quill from '../../../node_modules/quill'

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.css']
})
export class DetailsViewComponent implements OnInit {
  noteid: any;
  noteData: any;
  title: any;
  author: any;
  quill: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, ) {
    this.title = "";
    this.author = "";
    this.noteid = this.route.snapshot.paramMap.get('id');





    if (this.noteid) {
      console.log(this.noteid);
      this.api.getNoteById(this.noteid).subscribe(((x) => {
        this.noteData = x;


        const deltainactive = {
          ops: [
            { insert: this.noteData.note }
          ]
        };

        this.quill.setContents(deltainactive);
        this.quill.enable(false);
        this.title = this.noteData.title;
        this.author = this.noteData.author;
      }));

    }

  }

  ngOnInit() {
    // Quill configuration
    const config = {
      theme: 'snow'
    };

    this.quill = new Quill('#editor', config);

    // const delta = {
    //   ops: [
    //     { insert: "" }
    //   ]
    // };

    // this.quill.setContents(delta);
    // this.quill.enable(false);

  }

  private postNote() {
    let newNote = {
      "title": this.title,
      "note": this.quill.getContents()["ops"][0].insert,
      "author": this.author
    }
    this.api.postNote(newNote).subscribe((x) => {
      this.router.navigate(['/']);
    });
  }

}
