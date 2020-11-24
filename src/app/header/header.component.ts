import { Component } from '@angular/core';
import { DataStoreService } from '../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{
  constructor(private dataStoreService: DataStoreService){

  }
  saveData(){
    this.dataStoreService.storeRecipe();
  }

  fetchData(){
    this.dataStoreService.fetchRecipes().subscribe();
  }
}