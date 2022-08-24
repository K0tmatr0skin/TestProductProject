import {Component, OnDestroy, OnInit} from "@angular/core";
import {ProductListQuery, ProductListStore} from "../store/product-list.store";
import {ProductListService} from "../store/product-list.service";
import {from, Observable, Subject, takeUntil, tap} from "rxjs";
import {IProductDto} from "../../../share/dto/product.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductListQuery, ProductListStore, ProductListService]
})
export class ProductListComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  public loading$: Observable<boolean> = this._query.selectLoading().pipe(takeUntil(this._destroy$));

  public categories$: Observable<(string | null)[]> = this._query.select(st=> st.categories).pipe( takeUntil(this._destroy$));


  constructor(
    private _query: ProductListQuery,
    private _service: ProductListService,
    private router: Router) {
  }

  ngOnInit(): void {
    this._service.updateProductList().pipe(takeUntil(this._destroy$)).subscribe();
  }

  setSortedProducts(category: string | null): Observable<IProductDto[]> {
    return this._service.getSortedListByCategory(category).pipe(takeUntil(this._destroy$));
  }

  onAdd(): void{
    from(this.router.navigate(['/product-create'])).subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
