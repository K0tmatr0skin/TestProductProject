import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subject, takeUntil, tap} from "rxjs";
import {IProductDto} from "../../../share/dto/product.dto";
import {ProductCreateQuery, ProductCreateStore} from "../store/product-create.store";
import {ProductCreateService} from "../store/product-create.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductListService} from "../../product-list/store/product-list.service";
import {Location} from "@angular/common";
import {ProductListQuery} from "../../product-list/store/product-list.store";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  providers: [ProductCreateStore, ProductCreateService, ProductCreateQuery]
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  public loading$: Observable<boolean> = this._query.selectLoading().pipe(takeUntil(this._destroy$));

  public product$: Observable<IProductDto> = this._query.select(st => st.newProduct).pipe(takeUntil(this._destroy$));

  public categories$: Observable<(string | null)[]> = this._productListQuery.select(st => st.categories).pipe(takeUntil(this._destroy$));

  constructor(
    private _query: ProductCreateQuery,
    private _service: ProductCreateService,
    private _productListQuery: ProductListQuery,
    private _location: Location) {
  }

  public createForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    energy: new FormControl(null),
    category: new FormControl(null),
  })

  ngOnInit(): void {
    // this._query.select(st => st.newProduct).pipe(
    //   tap(data => this.createForm.patchValue(data, { emitEvent: false })),
    //   takeUntil(this._destroy$)
    // ).subscribe();

    this.createForm.controls['name'].valueChanges.pipe(
      tap(name => {
        this._service.updateStore({name})
      }),
      takeUntil(this._destroy$)
    ).subscribe();

    this.createForm.controls['energy'].valueChanges.pipe(
      tap(energy => this._service.updateStore({energy})),
      takeUntil(this._destroy$)
    ).subscribe();

    this.createForm.controls['category'].valueChanges.pipe(
      tap(category => this._service.updateStore({category})),
      takeUntil(this._destroy$)
    ).subscribe();
  }

  onBack(): void {
    this._location.back();
  }

  onSave(): void {
    if (this.createForm.valid) {
      this._service.saveNewProduct().subscribe()
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
