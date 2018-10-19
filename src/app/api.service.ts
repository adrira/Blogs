import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl = 'http://127.0.0.1:3014/';
  constructor(private http: Http) { }

  login(form) {
    return this.http.post(this.baseurl + 'auth/login', form);
  }

  postArticle(form) {
    console.log(form);
    return this.http.post(this.baseurl + 'blog/article', form);
  }

  getArticle() {
    return this.http.get(this.baseurl + 'blog/article');
  }

  getArticleById(id) {
    return this.http.get(this.baseurl + 'blog/search/' + id);
  }

  searchArticle(search) {
    return this.http.get(this.baseurl + 'blog/search-titre/' + search);
  }

  updateArticle(id, form) {
    return this.http.post(this.baseurl + 'blog/article/' + id, form);
  }
}
