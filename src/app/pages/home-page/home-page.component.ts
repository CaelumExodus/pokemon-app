import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonService } from "../../core/services/pokemon.service";
import { IValueAndId } from "../../core/interfaces/IValueAndId";
import { finalize } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { EvolutionService } from "../../core/services/evolution.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public isLoading = true;
  public pokemonDetailUrlList: IValueAndId[] = [];
  public pokemonListWithDetails: any = [];
  public offset = 0;


  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _httpClient: HttpClient,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _router: Router,
    private readonly _evolutionService: EvolutionService,
  ) {
  }

  ngOnInit(): void {
    (this._activatedRoute.queryParams.subscribe(
        res => {
          if (
            !isNaN(Number(res['offset'])) &&
            Number(res['offset']) >= 0 &&
            Number(res['offset']) <= 10249
          ) {
            this.offset = Number(res['offset']);
            this.getAllPokemons(this.offset);
          } else {
            this.resetPage();
          }
        }
      )
    )

  }

  public resetPage(): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        offset: 0
      }
    });
  }

  public getAllPokemons(offset: number): void {
    console.log(this.offset)

    this.isLoading = true;
    this.pokemonListWithDetails = [];
    this._pokemonService.getPokemonList(offset).pipe(
      finalize(() => {
        this.getPokemonDetails();
        this.isLoading = false;
      })
    ).subscribe(
      res => {
        this.pokemonDetailUrlList = res.results;
      }
    )
  }

  public getPokemonDetails() {
    this.pokemonDetailUrlList.forEach(pokemon => {
      this._pokemonService.getSinglePokemon(pokemon.name).pipe().subscribe(
        res => {
          this.pokemonListWithDetails.push(res)
        }
      )
    })
  }
}
