import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./product/product-list/component/product-list.component";
import {ProductCreateComponent} from "./product/prodact-create/component/product-create.component";

const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: '', pathMatch: 'full', redirectTo: 'product-list' },
  { path: '**', redirectTo: 'product-list' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
