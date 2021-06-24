import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  token: string;
  favList: Favorite[];
  private baseUrl = 'http://localhost:9191/';
  private getFavUrl = this.baseUrl + 'fav';
  private removeFromFavUrl = this.baseUrl + 'RemoveFromFavourite/';
  constructor(favService: FavoriteService,
    private router: Router,
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    console.warn(this.token);
    this.getFav();

  }
  getFav() {
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.token };
    console.log(headers);
    this.httpClient.get(this.getFavUrl, { 'headers': headers })
      .subscribe(
        data => {
          this.favList = JSON.parse(JSON.stringify(data));
          if(this.favList.length==0){
            alert("No books added");
          }
        },
        error => {
          console.log("tingggggg")
          console.log('oops', error.error.response),
          alert(error.error.response)
         //alert("ERROR");
        }
      );
  }
  removeFromFavourite(id) {
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.token };
    console.log(id);
    this.httpClient.delete(this.removeFromFavUrl + id, { 'headers': headers })
      .subscribe(
        data => {
          console.log(data),
              alert("removed successfully");
            this.ngOnInit()
        },
        error => {
          console.log('oops', error.error.response),
          alert(error.error.response)
        }
      );
  }


}
