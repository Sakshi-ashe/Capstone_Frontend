import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user.model';
import { Observable } from 'rxjs';
import {Router} from '@angular/router'
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {
  user = new User();
  token: string;
  private baseUrl = 'http://localhost:9191/';
  private registerUrl = this.baseUrl + 'register';
  private authorizationUrl = this.baseUrl + "authentication";
  registerView = 0;
  constructor(private userService: UserService,
    private httpClient: HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    this.registerView = 0;
  }

  addUser() {
    console.log(this.user.userName + " " + this.user.name + " " + this.user.password + " " + this.user.email);
    //var result=this.userService.addUser(this.user);
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(this.user);
    //  console.log(this.registerUrl+" "+body+" "+headers);
    this.httpClient.post(this.registerUrl, body, { 'headers': headers })
      .subscribe(
        data => {
          console.log('success', data),
          alert("Successfully registered")
        },
        error => {
          console.log('oops', error.error.response),
          alert(error.error.response)
        }
      );

  }
  change() {
    this.registerView = (this.registerView + 1) % 2;
  }
  loginUser() {
    console.log(this.user.userName + " " + this.user.password);
    const headers = { 'content-type': 'application/json' };
    var reqBody = '{"userName":"' + this.user.userName + '","password":"' + this.user.password + '"}';
    //const body=JSON.stringify(reqBody);
    console.log(this.authorizationUrl + " " + reqBody + " " + headers);
    this.httpClient.post(this.authorizationUrl, reqBody, { 'headers': headers })
      .subscribe(
        data => {
          
         this.token = data.response,
            alert("Logged In"),
            console.log('success', this.token),
            //this.searchComponent.ngOnInit();
            localStorage.setItem('currentUser', JSON.stringify({ token: this.token, name: name }))
          this.router.navigateByUrl('/books');
          window.location.reload();
        },
        error => { alert("Invalid Credentials"), console.log('oops', error.error.response) }

      );



  }

}
