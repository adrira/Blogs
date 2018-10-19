import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blogForm: FormGroup;
  blog;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.blogForm = new FormGroup({
      titre: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
    this.apiService.getArticleById(this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.blog = res.json();
      this.blogForm.controls['description'].setValue(res.json().description);
    });
  }

  saveBlog() {
    if (this.blogForm.valid) {
      this.apiService.updateArticle(this.route.snapshot.paramMap.get('id'), this.blogForm.value).subscribe(res => {
        if (res.json().ok = 1) {
          this.router.navigateByUrl('/home');
        }
      });
    }
  }

}
