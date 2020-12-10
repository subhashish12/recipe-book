import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  randomNumber = 2;
  constructor( private authService: AuthService){
    // setTimeout(()=>{ this.randomNumber = 4},2000)
  }
  title = 'website';
  
  ngOnInit(){
    this.authService.autoLogin();
  }

  onFeatureSelected(feature: string){
    this.loadedFeature = feature;
  }

}
