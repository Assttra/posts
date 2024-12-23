import {Component} from '@angular/core';
import {PostService} from "../../shared/services/api/post-service/post.service";
import {Post} from "../../shared/interfaces/post";
import {Observable, switchMap} from "rxjs";
import {UserService} from "../../shared/services/api/user-service/user.service";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent  {
  posts$: Observable<Post[]> = this.postService.getPosts().pipe(
    switchMap(() => {
      return this.postService.getPostsData();
    })
  )

  post: Post | undefined;
  hiddenIcon: boolean = false;
  showDeleteIcon: boolean = true;

  constructor(
    private postService: PostService, private userService: UserService
  ) { }


  triggerIfOutputDeletePost(id: number) {
    this.postService.deletePost(id).subscribe();
  }

  showDeleteIconByAdmin(): boolean {
    if(this.userService.isAdmin()) {
      return this.showDeleteIcon;
    } else {
      return !this.showDeleteIcon;
    }
  }
}
