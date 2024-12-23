import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from "../../interfaces/post";
import {Router} from "@angular/router";
import {UserService} from "../../services/api/user-service/user.service";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() post: Post | undefined;
  @Input() titlePath = '';
  @Output() removePost = new EventEmitter<number>();
  @Input() hiddenIcon: boolean = false;
  @Input() enableLink: boolean = true;
  @Input() showDeleteIcon: boolean = false;
  @Input() showEditIcon: boolean = true

  constructor(
    private router: Router,
  ) {
  }


  deletePost(id: number | undefined) {
    this.removePost.emit(id);
  }

  navigateToEditPost(id: number | undefined) {
    this.router.navigate([`create-post/${id}`])
  }

}
