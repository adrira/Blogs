import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user;
  href;
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = jwt_decode(localStorage.getItem('token')).data;
    this.href = this.router.url;
  }

}
