import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../../core/services/pokemon.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private readonly _pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this._pokemonService.getSinglePokemon().subscribe(
      res => console.log(res)
    )
  }

}
