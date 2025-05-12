import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Post} from "../../../interfaces/post";
import {env} from "../../../../../environments/env";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts$ = new BehaviorSubject<Post[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  addPost(post: Post | undefined): Observable<Post> {
    return this.httpClient.post<Post>(`${env.baseUrl}/api/add-post`, post);
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${env.baseUrl}/api/posts`).pipe(
      tap(posts => {
        this.posts$.next(posts)
      }));
  }

  deletePost(id: number | undefined) {
    return this.httpClient.delete<{ id: number }>(`${env.baseUrl}/api/delete-post/${id}`).pipe(
      tap(({id}) => {
        const updatedPosts = this.posts$.value.filter(post => post.id !== id);
        this.posts$.next(updatedPosts);
      })
    )
  }

  getPostsData(): Observable<Post[]> {
    return this.posts$.asObservable();
  }

  getPostById(id: number | undefined): Observable<Post> {
    return this.httpClient.get<Post>(`${env.baseUrl}/api/post/${id}`);
  }

  editPost(id: number | undefined, updatedPost: Post | undefined): Observable<Post> {
    return this.httpClient.put<Post>(`${env.baseUrl}/api/edit-post/${id}`, updatedPost);
  }

  searchPosts(searchText: string): Observable<Post[]> {
    return this.posts$.pipe(map(posts => posts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()))))
  }
}
