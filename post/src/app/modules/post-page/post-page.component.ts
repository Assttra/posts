import {Component, OnInit} from '@angular/core';
import {Post} from "../../shared/interfaces/post";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../shared/services/api/post-service/post.service";
import {switchMap} from "rxjs";
import {UserService} from "../../shared/services/api/user-service/user.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})

export class PostPageComponent implements OnInit {
  post: Post | undefined;
  hiddenIcon: boolean = true;
  showDeleteIcon: boolean = false;
  showEditIcon: boolean = false;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly postService: PostService,
    private readonly userService: UserService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      switchMap(params => {
        return this.postService.getPostById(params['id'])
      })
    ).subscribe(  post => {
      this.post = post;
      if(this.userService.isUser(this.post?.author.id)) {
         this.showDeleteIcon = true;
         this.showEditIcon = true;
      }
    });
  }
}
