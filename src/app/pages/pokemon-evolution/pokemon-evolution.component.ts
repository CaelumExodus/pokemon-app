import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../../core/services/pokemon.service";
import { ActivatedRoute } from "@angular/router";
import { EvolutionService } from "../../core/services/evolution.service";
import { HttpClient } from "@angular/common/http";
import { IPokemonEvolutions } from "../../core/interfaces/IPokemonEvolutions";
import { ISinglePokemon } from "../../core/interfaces/ISinglePokemon";

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss']
})
export class PokemonEvolutionComponent implements OnInit {

  public pokemonName: string | null = '';
  public pokemonEvolutionChain: IPokemonEvolutions[] = [];
  public pokemonInfo: ISinglePokemon[] = [];


  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _evolutionService: EvolutionService,
    private readonly _httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      params => this.pokemonName = params.get('name'),
    )

    this._pokemonService.getPokemonSpecies(this.pokemonName).subscribe(
      res => {
        this._evolutionService.getPokemonEvolutions(res.evolution_chain.url).subscribe(
          res => {
            this.pokemonEvolutionChain.push(res);
            this.getPokemonEvolutions();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    );
  }

  public getPokemonEvolutions(): void {
    this._pokemonService.getSinglePokemon(this.pokemonName).subscribe(
      res => {
        this.pokemonInfo.push(res)
      }
    )
  }
}
