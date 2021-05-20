

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  token:string;
  loggedIn:boolean;
  constructor(private router:Router) {}

  ngOnInit(): void {
    this.loggedIn=false;
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser!=null){
    this.token = currentUser.token;
      this.loggedIn=true;
    }
  }
  logout(){
    localStorage.clear();
    alert("Logged out")
    this.ngOnInit();
    this.router.navigateByUrl('/register');

  }
  doSearch(value: string){
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

}
