import {IProductDto} from "../../../share/dto/product.dto";
import {Injectable} from "@angular/core";
import {guid, Query, Store} from "@datorama/akita";

export interface IProductCreateState {
  newProduct: IProductDto
}

export const createInitialState = (): IProductCreateState => {
  return {
    newProduct: {
      id: 0,
      name: null,
      energy: null,
      category: null
    }
  };
};

@Injectable()
export class ProductCreateStore extends Store<IProductCreateState> {
  constructor() {
    super(createInitialState(), { name: `product-create-${guid()}` });
  }
}

@Injectable()
export class ProductCreateQuery extends Query<IProductCreateState> {
  constructor(protected override store: ProductCreateStore) {
    super(store);
  }
}
