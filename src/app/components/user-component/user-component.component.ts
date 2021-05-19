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
      private baseUrl='http://localhost:9191/';
      private registerUrl=this.baseUrl+'register';
      private authorizationUrl=this.baseUrl+"authentication";
     registerView=0;
     alertMessage="";
     alert=false;
    constructor(private userService: UserService,
      private appComponent:AppComponent,
      private httpClient : HttpClient) {}

    ngOnInit(): void {
       this.registerView= 0;
       this.alert=false;
    }

  addUser() {
    console.log(this.user.userName+" "+this.user.name+" "+this.user.password+" "+this.user.email);
    //var result=this.userService.addUser(this.user);
     const headers = { 'content-type': 'application/json'} ; 
    const body=JSON.stringify(this.user);
    //  console.log(this.registerUrl+" "+body+" "+headers);
    var result= this.httpClient.post(this.registerUrl,body,{'headers':headers})
    .subscribe((result)=>{
    console.log("result",result);
    })
    this.alertMessage="registered";
    this.alert=true;
    }
    change(){
      this.registerView= (this.registerView+1)%2;
      this.alert=false;
    }
    loginUser(){
      console.log(this.user.userName+" "+this.user.password);
      const headers = { 'content-type': 'application/json'} ; 
      var reqBody='{"userName":"'+this.user.userName+'","password":"'+this.user.password+'"}';
    //const body=JSON.stringify(reqBody);
      console.log(this.authorizationUrl+" "+reqBody+" "+headers);
    this.httpClient.post(this.authorizationUrl,reqBody,{'headers':headers})
    .subscribe((result)=>{
    console.log("result",result);
    this.appComponent.setToken("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMjAwIiwiZXhwIjoxNjIxNDM5NTUwLCJpYXQiOjE2MjE0MDM1NTB9.LsLW0EVEw95L815Mt41A2ovVUkSUcZVf4nGhWOfCW1M");
    })
    
    this.alertMessage="login";
    this.alert=true;
    
    }
    token(){
          this.appComponent.setToken("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMjAwIiwiZXhwIjoxNjIxNDM5NTUwLCJpYXQiOjE2MjE0MDM1NTB9.LsLW0EVEw95L815Mt41A2ovVUkSUcZVf4nGhWOfCW1M");
          console.log(this.appComponent.getToken());
          this.ngOnInit();
    }
  }
