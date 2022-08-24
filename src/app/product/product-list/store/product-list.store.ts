import {EntityState, EntityStore, QueryEntity, StoreConfig} from "@datorama/akita";
import {IProductDto} from "../../../share/dto/product.dto";
import {Injectable} from "@angular/core";

export interface IProductListState extends EntityState<IProductDto, number> {
  categories: string[]
}

const idKey: keyof IProductDto = 'id';

@Injectable({providedIn: 'root'})
@StoreConfig({ idKey, name: 'product-list' })
export class ProductListStore extends EntityStore<IProductListState> {
  constructor() {
    super();
  }
}

@Injectable({providedIn: 'root'})
export class ProductListQuery extends QueryEntity<IProductListState> {

  constructor(protected override store: ProductListStore) {
    super(store);
  }

}
