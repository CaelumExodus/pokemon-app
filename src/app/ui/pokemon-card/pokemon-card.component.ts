import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IPokemonType } from "../../core/interfaces/IPokemonType";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemonId!: number;
  @Input() pokemonName = 'No data'
  @Input() pokemonTypes: IPokemonType[]  = [];
  @Input() pokemonRegion = 'No data'
  @Input() pokemonSprite = ''

  constructor(
    private readonly _cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

}
