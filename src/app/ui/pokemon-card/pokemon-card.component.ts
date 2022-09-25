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
  @Input() pokemonTypes: IPokemonType[] = [];
  @Input() pokemonRegion = 'No data'
  @Input() pokemonSprite = ''
  @Input() isRouterLinkActive = true;

  public borderColor = ''

  constructor() {
  }

  ngOnInit(): void {
    switch (this.pokemonTypes[0].type.name) {
      case 'grass':
        this.borderColor = 'green'
        break;
      case 'poison':
        this.borderColor = 'purple'
        break;
      case 'fire':
        this.borderColor = 'orange'
        break;
      case 'water':
        this.borderColor = 'blue'
        break;
      case 'normal':
        this.borderColor = 'grey'
        break;
      case 'bug':
        this.borderColor = 'bisque'
        break;
      case 'fairy':
        this.borderColor = 'pink'
        break;
      case 'ground':
        this.borderColor = 'brown'
        break;
      case 'rock':
        this.borderColor = 'silver'
        break;
      case 'fighting':
        this.borderColor = 'red'
        break;
      case 'steel':
        this.borderColor = 'lightsteelblue'
        break;
      case 'ghost':
        this.borderColor = 'wheat'
        break;
      case 'ice':
        this.borderColor = 'lightblue'
        break;
      case 'psychic':
        this.borderColor = 'mediumpurple'
        break;
      case 'dragon':
        this.borderColor = 'gold'
        break;
      case 'electric':
        this.borderColor = 'yellow'
        break;
    }
  }

}
