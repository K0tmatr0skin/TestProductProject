import {IProductDto} from "../dto/product.dto";
import {Injectable} from "@angular/core";
import {Query, Store} from "@datorama/akita";

export interface IDataBaseState {
  products: IProductDto[]
}

export const createInitialState = (): IDataBaseState => {
  return {
    products: [
      {id: 0, name: 'Potato', energy: 25, category: 'Vegetable'},
      {id: 1, name: 'Raspberry', energy: 35, category: 'Fruit'},
      {id: 2, name: 'Carrot', energy: 15, category: 'Vegetable'},
      {id: 3, name: 'banana', energy: 40, category: 'Fruit'},
    ]
  };
};

@Injectable({providedIn: 'root'})
export class DataBaseStore extends Store<IDataBaseState> {
  constructor() {
    super(createInitialState(), {name: 'database'});
  }
}

@Injectable({providedIn: 'root'})
export class DataBaseQuery extends Query<IDataBaseState> {
  constructor(protected override store: DataBaseStore) {
    super(store);
  }
}
