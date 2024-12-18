import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../../interfaces/post";
import {env} from "../../../../../environments/env";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  addPost(post: Post | undefined): Observable<Post> {
    console.log(post)
      return this.httpClient.post<Post>(`${env.baseUrl}/api/add-post`, post);
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${env.baseUrl}/api/posts`)
  }
}
