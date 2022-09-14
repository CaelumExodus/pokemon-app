import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISinglePokemon } from "../../core/interfaces/ISinglePokemon";

@Component({
  selector: 'app-paginated-list',
  templateUrl: './paginated-list.component.html',
  styleUrls: ['./paginated-list.component.scss']
})
export class PaginatedListComponent implements OnInit {

  @Input() pokemonDisplayList: ISinglePokemon[] = [];

  @Output() changePageEmitter = new EventEmitter<number>()

  private _offset = 0;


  constructor() {
  }

  ngOnInit(): void {
    console.log(this.pokemonDisplayList);
  }

  public nextPage(): void {
    if (this._offset !== 10249) {
      this._offset += 20
      this.changePageEmitter.emit(this._offset)
    }
  }

  public previousPage(): void {
    if (this._offset > 0) {
      this._offset -= 20
      this.changePageEmitter.emit(this._offset)
      console.log(this._offset)
    }
  }
}
