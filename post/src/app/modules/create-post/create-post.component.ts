import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../shared/services/api/post-service/post.service";
import {Post} from "../../shared/interfaces/post";
import {Category} from "../../shared/enums/category";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  post?: Post;
  options: Category[] = [
    Category.OPINION,
    Category.NEWS,
    Category.TUTORIAL
  ]

  buttonText: string = ''
  form: FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required, Validators.minLength(9)]],
    category: [null, [Validators.required]],
    anonymousUser: [false, [Validators.required]]
  })



  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  onSubmit() {
    if(this.post?.id) {
      this.postService.editPost(this.post.id, this.form.value).subscribe(() => this.router.navigate(['posts']))
    } else
    this.postService.addPost(this.form.value).subscribe(() => this.router.navigate(['posts']));
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if(params['id']) {
        this.buttonText = 'Edit Post';
        this.loadPostData(params['id'])
      } else {
        this.buttonText = 'Create Post'
      }
    })
  }

  loadPostData(id: number) {
    this.postService.getPostById(id).subscribe( post => {
      this.post = post;
      this.form.patchValue({
        title: post.title,
        content: post.content,
        category: post.category,
        anonymousUser: post.anonymousUser
      })
    })
  }
}
