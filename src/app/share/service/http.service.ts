import {debounceTime, map, Observable, of, switchMap, withLatestFrom} from "rxjs";
import {IServerResponseDto} from "../dto/server-response.dto";
import {IProductDto} from "../dto/product.dto";
import {Injectable} from "@angular/core";
import {DataBaseQuery, DataBaseStore} from "./database.store";

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private _dbStore: DataBaseStore, private _dbQuery: DataBaseQuery) {
  }

  getProductList(): Observable<IServerResponseDto<IProductDto[]>> {
    return of(0).pipe(
      debounceTime(500),
      switchMap(() => this._dbQuery.select(st => st.products)),
      map((productListData) => {
        const response: IServerResponseDto<IProductDto[]> = {
          data: productListData,
          error: null
        }
        return response;
      })
    );
  }

  addProduct(newProduct: IProductDto): Observable<IServerResponseDto<boolean>> {
    return of(0).pipe(
      debounceTime(500),
      withLatestFrom(this._dbQuery.select(st => st.products)),
      map(([, products]) => {
        this._dbStore.update(state => ({
          ...state, products: [...products, { ...newProduct, id: products.length}]
        }))
        const response: IServerResponseDto<boolean> = {
          data: true,
          error: null
        }
        return response;
      })
    );
  }
}
