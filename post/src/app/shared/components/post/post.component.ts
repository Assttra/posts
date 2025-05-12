import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../interfaces/post";
import {Router} from "@angular/router";
import {ReactionEnum} from "../../enums/reaction";
import {UserService} from "../../services/api/user-service/user.service";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post | undefined;
  @Input() titlePath = '';
  @Output() removePost = new EventEmitter<number>();
  @Input() hiddenIcon = false;
  @Input() enableLink = true;
  @Input() showDeleteIcon = false;
  @Input() showEditIcon = true;
  @Output() addReaction = new EventEmitter<{ post: Post | undefined, type: ReactionEnum }>();

  showReaction: boolean | undefined = true;

  reactionEnum = ReactionEnum;
  constructor(
    private router: Router,
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.verifyCurrentUserIsReact();
    console.log(this.post)
  }

  deletePost(id: number | undefined) {
    this.removePost.emit(id);
  }

  navigateToEditPost(id: number | undefined) {
    this.router.navigate([`create-post/${id}`])
  }

  onReact(post: Post | undefined, type: ReactionEnum) {
    this.verifyCurrentUserIsReact();
    this.addReaction.emit({post, type});
  }

  getLikesCount(): number {
    return this.post!.reactions.filter(reaction => reaction.likes).length;
  }

  getDislikesCount(): number {
    return this.post!.reactions.filter(reaction => reaction.dislikes).length;
  }

  verifyCurrentUserIsReact(): void {
    const userIsReacting = this.post?.reactions.find(reaction => reaction.userId === this.userService.user$.getValue()?.id);
    this.showReaction = userIsReacting?.likes ? userIsReacting?.likes : userIsReacting?.dislikes;
  }
}
