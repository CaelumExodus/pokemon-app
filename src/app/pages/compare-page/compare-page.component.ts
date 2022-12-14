import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../../core/services/pokemon.service";
import { IPokemonStats } from "../../core/interfaces/IPokemonStats";
import { Location } from "@angular/common";
import { finalize } from "rxjs";

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.scss']
})
export class ComparePageComponent implements OnInit {

  public firstPokemonIsLoading = false;
  public secondPokemonIsLoading = false;

  public firstPokemon = '';
  public secondPokemon = '';
  public pokemonNames: string[] = [];
  public firstPokemonStats: IPokemonStats[] = [];
  public secondPokemonStats: IPokemonStats[] = [];

  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _location: Location,
  ) {
  }

  ngOnInit(): void {
    this._pokemonService.getPokemonList(1154).subscribe(
      res => {
        res.results.forEach(pokemon => this.pokemonNames.push(pokemon.name))
      },
      err => console.log(err)
    )
  }

  public goBack(): void {
    this._location.back();
  }

  public comparePokemons(): void {
    this.firstPokemonIsLoading = true;
    this.secondPokemonIsLoading = true;
    this.firstPokemonStats = [];
    this.secondPokemonStats = [];

    this._pokemonService.getSinglePokemon(this.firstPokemon).pipe(
      finalize(() => this.firstPokemonIsLoading = false)
    ).subscribe(
      res => {
        this.firstPokemonStats = res.stats
      },
      err => console.log(err)
    )

    this._pokemonService.getSinglePokemon(this.secondPokemon).pipe(
      finalize(() => this.secondPokemonIsLoading = false)
    ).subscribe(
      res => {
        this.secondPokemonStats = res.stats
      },
      err => console.log(err)
    )
  }


}
