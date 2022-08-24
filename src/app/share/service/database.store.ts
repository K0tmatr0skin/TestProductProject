import {IProductDto} from "../dto/product.dto";
import {Injectable} from "@angular/core";
import {Query, Store} from "@datorama/akita";

export interface IDataBaseState {
  products: IProductDto[]
}

export const createInitialState = (): IDataBaseState => {
  return {
    products: [
      {
        id:0,
        name: 'Огурец',
        energy: 35,
        category: 'Овощи',
      },
      {
        id: 1,
        name: 'Курица',
        energy: 134,
        category: 'Мясо и Птица',
      },
      {
        id: 2,
        name: 'Картофель',
        energy: 80,
        category: 'Овощи',
      },
      {
        id: 3,
        name: 'Говядина',
        energy: 178,
        category: 'Мясо и Птица',
      },
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
