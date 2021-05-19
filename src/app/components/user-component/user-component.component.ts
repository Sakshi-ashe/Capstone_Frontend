  import { Component, OnInit } from '@angular/core';
  import { User } from 'src/app/common/user.model';
  import { Observable } from 'rxjs';
  import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';


  @Component({
    selector: 'app-user-component',
    templateUrl: './user-component.component.html',
    styleUrls: ['./user-component.component.css']
  })
  export class UserComponentComponent implements OnInit {
    user = new User();
    token:string;
      private baseUrl='http://localhost:9191/';
      private registerUrl=this.baseUrl+'register';
      private authorizationUrl=this.baseUrl+"authentication";
     registerView=0;
    constructor(private userService: UserService,
      private appComponent:AppComponent,
      private httpClient : HttpClient) {}

    ngOnInit(): void {
       this.registerView= 0;
    }

  addUser() {
    console.log(this.user.userName+" "+this.user.name+" "+this.user.password+" "+this.user.email);
    //var result=this.userService.addUser(this.user);
     const headers = { 'content-type': 'application/json'} ; 
    const body=JSON.stringify(this.user);
    //  console.log(this.registerUrl+" "+body+" "+headers);
     this.httpClient.post(this.registerUrl,body,{'headers':headers})
          .subscribe(
        data => {console.log('success', data),
        alert("Successfully registered")
      },
        error => {console.log('oops',error.error.response),
        alert(error.error.response)}
      );
 
    }
    change(){
      this.registerView= (this.registerView+1)%2;
    }
    loginUser(){
      console.log(this.user.userName+" "+this.user.password);
      const headers = { 'content-type': 'application/json'} ; 
      var reqBody='{"userName":"'+this.user.userName+'","password":"'+this.user.password+'"}';
    //const body=JSON.stringify(reqBody);
      console.log(this.authorizationUrl+" "+reqBody+" "+headers);
    this.httpClient.post(this.authorizationUrl,reqBody,{'headers':headers})
          .subscribe(
        data =>{ this.token=data.response,alert("Logged In"),console.log('success',this.token)},
        error => {alert("Invalid Credentials"),console.log('oops',error.error.response)}
        
      );
      
    
    
    }
    fun(){
          this.appComponent.setToken("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMjAwIiwiZXhwIjoxNjIxNDM5NTUwLCJpYXQiOjE2MjE0MDM1NTB9.LsLW0EVEw95L815Mt41A2ovVUkSUcZVf4nGhWOfCW1M");
          console.log(this.appComponent.getToken());
          this.ngOnInit();
    }
  }
