import {Component} from '@angular/core';
import {PostService} from "../../shared/services/api/post-service/post.service";
import {Post} from "../../shared/interfaces/post";
import {Observable, tap} from "rxjs";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent  {

  posts$: Observable<Post[]> = this.postService.getPosts()
  post: Post | undefined

  constructor(private postService: PostService) { }



}
