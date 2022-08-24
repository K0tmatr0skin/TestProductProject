import {Injectable} from "@angular/core";
import {HttpService} from "../../share/service/http.service";
import {catchError, EMPTY, map, mapTo, Observable, of, switchMap, tap, throwError, withLatestFrom} from "rxjs";
import {IProductDto} from "../../share/dto/product.dto";
import {ProductCreateQuery, ProductCreateStore} from "./product-create.store";
import {Location} from "@angular/common";

@Injectable()
export class ProductCreateService {
  constructor(
    private _store: ProductCreateStore,
    private _query: ProductCreateQuery,
    private _http: HttpService,
    private _location: Location
  ) {
  }

  updateStore(info: Partial<IProductDto>): void {
    this._store.update(state => {
      return {
        ...state, newProduct: {
          ...state.newProduct,
          ...info
        }
      };
    });
  }

  saveNewProduct(): Observable<void> {
    return of(void 0).pipe(
      tap(() => {
        this._store.setLoading(true);
      }),
      withLatestFrom(this._query.select(st => st.newProduct)),
      switchMap(([, newProduct]) => this._http.addProduct(newProduct)),
      tap((resp) => {
        if (resp.error != null) {
          throwError(resp.error.message);
        } else {
          this._store.setLoading(false);
          this._location.back();
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
}
