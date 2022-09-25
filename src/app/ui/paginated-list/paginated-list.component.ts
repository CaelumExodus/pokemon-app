import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ISinglePokemon } from "../../core/interfaces/ISinglePokemon";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-paginated-list',
  templateUrl: './paginated-list.component.html',
  styleUrls: ['./paginated-list.component.scss']
})
export class PaginatedListComponent implements OnInit, OnDestroy {

  @Input() pokemonDisplayList: ISinglePokemon[] = [];
  @Input() showPagination = true;
  @Input() offset = 0;

  @Output() changePageEmitter = new EventEmitter<number>();



  private _subArray: Subscription[] = [];

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  public nextPage(): void {
    if (this.offset <= 10249) {
      this.offset += 20
      this.appendQueryParams();
      this.changePageEmitter.emit(this.offset)
    }
  }

  public previousPage(): void {
    if (this.offset > 0) {
      this.offset -= 20
      this.appendQueryParams();
      this.changePageEmitter.emit(this.offset)
    }
  }

  private appendQueryParams(): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        offset: this.offset
      },
    });
  }



  ngOnDestroy() {
    this._subArray.forEach(subscription => subscription.unsubscribe());
  }
}
