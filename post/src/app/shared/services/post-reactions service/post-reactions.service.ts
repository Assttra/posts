import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reaction} from "../../interfaces/reaction";
import {env} from "../../../../environments/env";
import {Post} from "../../interfaces/post";
import {ReactionEnum} from "../../enums/reaction";

@Injectable({
  providedIn: 'root'
})
export class PostReactionsService {

  constructor(private httpClient: HttpClient) { }

 addReaction(post: Post, type: ReactionEnum): Observable<Reaction> {
   return this.httpClient.post<Reaction>(`${env.baseUrl}/api/post/reaction?action=${type}`, post)
 }
}
