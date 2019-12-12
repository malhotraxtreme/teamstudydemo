import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:3000/api/";

  }

  getNotes() {
    return this.http.get(this.apiUrl);
  }

  getNoteById(id) {
    return this.http.get(this.apiUrl + "note/" + id);
  }


  postNote(newnote) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.apiUrl + 'create/', newnote, httpOptions);
  }
}
