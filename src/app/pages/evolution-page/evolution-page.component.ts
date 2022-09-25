import { Component, OnInit } from '@angular/core';
import { ISinglePokemon } from "../../core/interfaces/ISinglePokemon";
import { PokemonService } from "../../core/services/pokemon.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EvolutionService } from "../../core/services/evolution.service";
import { HttpClient } from "@angular/common/http";
import { finalize, Subscription } from "rxjs";
import { Location } from "@angular/common";

@Component({
  selector: 'app-evolution-page',
  templateUrl: './evolution-page.component.html',
  styleUrls: ['./evolution-page.component.scss']
})
export class EvolutionPageComponent implements OnInit {

  public pokemonName: string | null = '';
  public pokemonEvolutionChain: any = {};
  public pokemonInfo: ISinglePokemon[] = [];
  public evolutionNames: string[] = [];
  public isLoading = true;

  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _evolutionService: EvolutionService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _httpClient: HttpClient,
    private readonly _location: Location,
    private readonly _router: Router
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
            this.pokemonEvolutionChain = res;
            this.getPokemonDetails();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    );
  }

  public goBack(): void {
    this._location.back();
  }

  public getPokemonDetails(): void {
    if (this.pokemonEvolutionChain.chain) {
      let evChain = this.pokemonEvolutionChain.chain;
      this.evolutionNames.push(evChain.species.name);

      while (evChain) {
        evChain = evChain.evolves_to[0];
        if (evChain === undefined) break;

        this.evolutionNames.push(evChain.species.name);
        console.log(this.evolutionNames);
      }

    }
    console.log('next');

    this.evolutionNames.forEach(pokemonName => {
        this._pokemonService.getSinglePokemon(pokemonName).pipe(
          finalize( () => this.isLoading = false)
        ).subscribe(
          res => {
            this.pokemonInfo.push(res)
            console.log(this.pokemonInfo);
          }
        )
      }
    )
  }



}
