import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Food-Ordering-System-FE';
  token:string;

setToken(token:string){
this.token=token;
}
getToken(){
  return this.token;
}
}
