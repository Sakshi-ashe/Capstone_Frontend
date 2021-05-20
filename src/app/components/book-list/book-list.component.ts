

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookCategory } from 'src/app/common/book-category';
import { BookService } from 'src/app/services/book.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  token: string;

  previousKeyword: string = null;
  private baseUrl = 'http://localhost:9191/';
  private getAllBooksUrl = this.baseUrl + 'getAllBooks';
  private addToFavouriteUrl = this.baseUrl + 'AddToFavourite/';
  constructor(bookService: BookService,
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    this.getAllBooks();

  }


  addToFavourite(id) {
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.token };
    //  let headers = new HttpHeaders();
    //headers = headers(  { 'content-type': 'application/json','Authorization':'Bearer '+this.token});
    console.log(id, this.addToFavouriteUrl + id,);
    var reqBody = ""; 
    this.httpClient.post(this.addToFavouriteUrl + id, reqBody,{ 'headers': headers })
      .subscribe(
        data => {
            alert("Added successfully"),
            console.log('success', data)
        },
        error => { alert(error.error.response), console.log('oops', error) }

      );
  }

  getAllBooks() {
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.token };
    console.log(headers);
    this.httpClient.get(this.getAllBooksUrl, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token) })
      .subscribe(
        data => { this.books = JSON.parse(JSON.stringify(data)), console.log('success', data) },
        error => { alert(error.error.response), console.log('oops', error.error.response) }

      );
  }
}