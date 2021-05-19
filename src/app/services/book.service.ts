




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { map } from 'rxjs/operators'
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  // Note: initially this whole class is empty.
  // Below code is written by hand.

  //private baseUrl ='http://localhost:1717/api/products';
  //by default , only 20 items diplayed even when 100 items present .
  
  private baseUrl ='http://localhost:9191/';
  private categoryUrl =this.baseUrl+'getAllBooks';
  token:string="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMjAwIiwiZXhwIjoxNjIxMzk1NzI4LCJpYXQiOjE2MjEzNTk3Mjh9.15SNVB62YbZYeB97-wZfeKQbo-Y6BWw_941jLteFy-g";


  constructor(private httpClient : HttpClient) { }

  // getBooksListPaginate(thePage: number, 
  //                         thePageSize: number,
  //                         theCategoryId : number) : Observable<GetResponseBooks>
  // {
  //   //need to build url based on category id
  //   const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
  //                     + `&page=${thePage}&size=${thePageSize}`;

  //   return this.httpClient.get<GetResponseBooks>(searchUrl);
  // }

  

 /*  getBooksList(theCategoryId : number) : Observable<Book[]>
  {
    //need to build url based on category id
    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    console.log(searchUrl);

    return this.getBooks(searchUrl);
  } */

  getBookCategories(): Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );

  }


  // searchBooks(theKeyword : string) : Observable<Book[]>{
  //       //need to build url based on keyword
  //       const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
  //       console.log(searchUrl);
  
  //       return this.getBooks(searchUrl);
    
  // }

  // searchBooksPaginate(thePage: number, 
  //                         thePageSize: number,
  //                         theKeyword : string) : Observable<GetResponseBooks>
  //                     {
  //                     //need to build url based on category id
  //                     const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
  //                     + `&page=${thePage}&size=${thePageSize}`;

  //                     return this.httpClient.get<GetResponseBooks>(searchUrl);
  //                     }


//select the repetitive code -> refactor -> to a method
  // private getBooks(searchUrl: string): Observable<Book[]> {
  //   return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
  //     map(response => response._embedded.books)
  //   );
  // }


  // getBook(theBookId: number): Observable<Book> {
  //     // need to build url based on book id
  //     const bookUrl = `${this.baseUrl}/${theBookId}`;

  //     return this.httpClient.get<Book>(bookUrl);
  // }

}




interface GetResponseBooks{
  _embedded:{
    books: Book[]
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}




interface GetResponseBookCategory{
  _embedded:{
    bookCategory: BookCategory[];
  }
}
