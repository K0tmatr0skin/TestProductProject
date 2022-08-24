import {Injectable} from "@angular/core";
import {ProductListQuery, ProductListStore} from "./product-list.store";
import {HttpService} from "../../share/service/http.service";
import {catchError, EMPTY, map, mapTo, Observable, of, switchMap, tap, throwError} from "rxjs";
import {IProductDto} from "../../share/dto/product.dto";

@Injectable({providedIn: 'root'})
export class ProductListService {
  constructor(
    private _store: ProductListStore,
    private _query: ProductListQuery,
    private _http: HttpService
  ) {
  }

  getSortedListByCategory(category: string | null): Observable<IProductDto[]> {
    return this._query.selectAll().pipe(
      map((products: IProductDto[]) => products.filter(x => x.category === category))
    );
  }

  updateProductList(): Observable<void> {
    return of(void 0).pipe(
      tap(() => {
        this._store.setLoading(true);
      }),
      switchMap(() => this._http.getProductList()),
      tap((resp) => {
        if (resp.error != null) {
          throwError(resp.error.message);
        } else {
          this._store.upsertMany(resp.data);
          this._store.update(state => {
            return {
              ...state, categories: this._getUniqueCategory(resp.data)
            };
          });
          this._store.setLoading(false);
        }
      }),
      catchError((err) => {
        this._store.setError<string>(err);
        this._store.setLoading(false);
        return EMPTY;
      }),
      mapTo(void 0),
    );
  }

  private _getUniqueCategory(products: IProductDto[]): (string | null)[] {
    return [...new Set(products.map(el => el.category))];
  }
}
