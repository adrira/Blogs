import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ApiService} from '../../api.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  image;
  blogForm;
  user;
  constructor(private apiService: ApiService, private router: Router) {
    this.blogForm = new FormGroup({
      titre: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
  }
  saveBlog() {
    // alert('aaaa');
    this.user = jwt_decode(localStorage.getItem('token')).data;

    // const formData: any = this.blogForm.value;
    const formData = new FormData();
    formData.set('fileimage', this.image);
    formData.set('author', this.user._id);
    if (this.user.roles = 'admin') {
      formData.set('published', 'true');
    } else {
      formData.set('published' , 'false');
    }

     console.log(formData);

    // if (this.blogForm.valid) {
      this.apiService.postArticle(formData).subscribe(res => {
        if (res.json()._id) {
          this.router.navigateByUrl('/home');
        }
      });
    // }
  }
  change(event) {
    this.image = event.target.files[0];
  }

}
