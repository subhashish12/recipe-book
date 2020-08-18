import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';
  randomNumber = 2;
  constructor(){
    // setTimeout(()=>{ this.randomNumber = 4},2000)
  }
  title = 'website';
  
  onFeatureSelected(feature: string){
    this.loadedFeature = feature;
  }

}
