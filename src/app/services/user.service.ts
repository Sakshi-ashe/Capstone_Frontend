import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../common/user.model';
import { map } from 'rxjs/operators';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl='http://localhost:9191/';
  private registerUrl=this.baseUrl+'register';

  constructor(private httpClient : HttpClient) { }

  
  
    addUser(user:User): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
      console.log(this.registerUrl+" "+body+" "+headers);
    var result= this.httpClient.post(this.registerUrl,body,{'headers':headers});
    return result;

  }

  
}
