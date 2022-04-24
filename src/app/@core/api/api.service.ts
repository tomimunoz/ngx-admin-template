import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "http://localhost:3000/"
  
  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get(
      this.url + 'data/posts'
    )
  }
}
