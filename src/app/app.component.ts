import { Component } from '@angular/core';
import {ProductListService} from "./product/product-list/store/product-list.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestProject';

  constructor(private _listService: ProductListService) {
    this._listService.updateProductList().subscribe();
  }
}
