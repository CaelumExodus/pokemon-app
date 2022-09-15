import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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

  @Output() changePageEmitter = new EventEmitter<number>()


  private _offset = 0;
  private _subArray: Subscription[] = []

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if(this._subArray.length) {
      this._subArray.forEach(subscription => subscription.unsubscribe());
    }

    this._subArray.push(this._activatedRoute.queryParams.subscribe(
        res => {
          console.log('params Changed')
          if (Number(res['offset'] >= 0)) {
            this._offset = Number(res['offset'])
            console.log(this._offset)
          }
        }
      )
    )
  }

  public nextPage(): void {
    if (this._offset !== 10249) {
      this._offset += 20
      this.appendQueryParams();
      this.changePageEmitter.emit(this._offset)
    }
  }

  public previousPage(): void {
    if (this._offset > 0) {
      this._offset -= 20
      this.appendQueryParams();
      this.changePageEmitter.emit(this._offset)
    }
  }

  private appendQueryParams(): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        offset: this._offset
      }
    });
  }

  ngOnDestroy() {
    this._subArray.forEach(subscription => subscription.unsubscribe());
  }

}
