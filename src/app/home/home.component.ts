import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user;
  articles;
  search;
  constructor(private apiService: ApiService) {
    this.user = jwt_decode(localStorage.getItem('token')).data;
   }

  ngOnInit() {
    this.apiService.getArticle().subscribe(res => {
      this.articles = res.json();
    });
  }

  Search() {
    if (this.search) {
      this.apiService.searchArticle(this.search).subscribe(res => {
        this.articles = res.json();
      });
    } else {
      this.ngOnInit();
    }
  }

}
