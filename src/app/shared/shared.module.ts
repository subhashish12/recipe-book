import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
    ],

    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule{

}