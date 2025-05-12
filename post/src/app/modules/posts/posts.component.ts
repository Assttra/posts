import {Component, OnInit} from '@angular/core';
import {PostService} from "../../shared/services/api/post-service/post.service";
import {Post} from "../../shared/interfaces/post";
import {BehaviorSubject, combineLatest, Observable, switchMap} from "rxjs";
import {UserService} from "../../shared/services/api/user-service/user.service";
import {PostReactionsService} from "../../shared/services/post-reactions service/post-reactions.service";
import {ReactionEnum} from "../../shared/enums/reaction";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit
{
  searchText$ = new BehaviorSubject<string>('');
  filteredPosts$: Observable<Post[]> | undefined;

  posts$: Observable<Post[]> = this.postService.getPosts().pipe(
    switchMap(() => {
      return this.postService.getPostsData();
    })
  );

  post: Post | undefined;
  hiddenIcon: boolean = false;
  showDeleteIcon: boolean = true;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private postReactionsService: PostReactionsService
  ) {
  }
  ngOnInit() {
    this.filteredPosts$ = this.searchText$.pipe(switchMap(searchText => this.postService.searchPosts(searchText)))
  }

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

  triggerIfOutputAddReaction(data: { post: Post | undefined, type: ReactionEnum }) {
    if (!data.post) return;
    this.postReactionsService.addReaction(data.post, data.type).subscribe(() => {
    })
  }

  inputChanges(event: Event): void {

    const target = event.target as HTMLInputElement
    const value = target.value;
    this.searchText$.next((value))
  }
}
