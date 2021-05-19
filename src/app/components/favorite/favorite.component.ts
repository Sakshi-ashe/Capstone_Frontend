import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Favorite } from 'src/app/common/favorite.model';
import { BookCategory } from 'src/app/common/book-category';
import { FavoriteService } from 'src/app/services/favorite.service';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
 token:string;
favList:Favorite[];
    private baseUrl ='http://localhost:9191/';
  private getFavUrl =this.baseUrl+'fav';
  private removeFromFavUrl=this.baseUrl+'RemoveFromFavourite/';
  private addToFavouriteUrl=this.baseUrl+'AddToFavourite/';
  constructor( favService : FavoriteService,
              private router: Router,
              private appComponent:AppComponent,
              private route: ActivatedRoute,
              private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.token=this.appComponent.getToken();
    this.token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMjAwIiwiZXhwIjoxNjIxNDQ2NzcxLCJpYXQiOjE2MjE0MTA3NzF9.wRVX21AJul6UGQ95GkoE5bRdYAO6snKBX7WHRQ0dNvk";
    console.warn(this.token);
    this.getFav();
    
  }
 getFav(){
 const headers = { 'content-type': 'application/json','Authorization':'Bearer '+this.token} ; 
    console.log(headers);
     this.httpClient.get(this.getFavUrl,{'headers':headers})
    .subscribe((result)=>{
      this.favList = JSON.parse(JSON.stringify(result));
   console.log("result",result);
   console.log(this.favList);
   console.log(this.favList[0]);
    })
  }
      removeFromFavourite(id){
         const headers = { 'content-type': 'application/json','Authorization':'Bearer '+this.token} ; 
        console.log(id);
        this.httpClient.delete(this.removeFromFavUrl+id,{'headers':headers})
    .subscribe((result)=>{
   console.log("result",result);
   this.ngOnInit();
   console.log("purvi");
   //console.log(this.favList[0]);
    }),
      err => {
        this.ngOnInit();
        console.log("Error");
      }   
      }


}
