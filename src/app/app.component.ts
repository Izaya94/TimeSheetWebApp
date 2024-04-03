import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    // title = 'TestTime';
    // httpClient = inject(HttpClient);
    // products:any = [];
    // fetchProducts(): void {
    //     this.httpClient.get("http://localhost:5055/Products").subscribe((data:any)=>{
    //         this.products = data;
    //         console.log(this.products);
    //     });
        
    // }

    constructor(private primengConfig: PrimeNGConfig) { }

    
    // ngOnInit():void{
    //     this.primengConfig.ripple = true;
    //     this.fetchProducts();
    // }
}
