import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../shared/services/api/post-service/post.service";
import {Post} from "../../shared/interfaces/post";
import {Category} from "../../shared/enums/category";
import {Route, Router} from "@angular/router";


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  post?: Post;
  options: Category[] = [
    Category.OPINION,
    Category.NEWS,
    Category.TUTORIAL
  ]

  form: FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required, Validators.minLength(9)]],
    category: [null, [Validators.required]],
    anonymousUser: [false, [Validators.required]]
  })
  constructor(private formBuilder: FormBuilder, private postService: PostService, private router: Router) {
  }

  onSubmit() {
     this.postService.addPost(this.form.value).subscribe(() => this.router.navigate(['posts']));
  }
}
