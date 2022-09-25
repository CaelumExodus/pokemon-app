import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { PokemonService } from "../../core/services/pokemon.service";
import { IValueAndId } from "../../core/interfaces/IValueAndId";
import { filter, finalize } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { EvolutionService } from "../../core/services/evolution.service";
import { ISinglePokemon } from "../../core/interfaces/ISinglePokemon";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public isLoading = true;
  public pokemonDetailUrlList: IValueAndId[] = [];
  public pokemonListWithDetails: ISinglePokemon[] = [];
  public pokemonListWithDetailsCopy: ISinglePokemon[] = [];
  public offset = 0;
  public filtersArray: string[] = [];
  public availableFiltersArray: string[] = [];


  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _evolutionService: EvolutionService,
    private readonly _httpClient: HttpClient,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
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
    this.isLoading = true;
    this.pokemonListWithDetails = [];
    this._pokemonService.getPokemonList(20, offset).pipe(
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
      this._pokemonService.getSinglePokemon(pokemon.name).pipe(
        finalize(() => this.showAvailableFilters())
      ).subscribe(
        res => {
          this.pokemonListWithDetails.push(res);
          this.pokemonListWithDetailsCopy = this.pokemonListWithDetails;
        }
      )
    })
  }

  public showAvailableFilters() {
    this.availableFiltersArray = [];

    this.pokemonListWithDetails.forEach(pokemon => {
      pokemon.types.forEach(types => {
        if (this.availableFiltersArray.indexOf(types.type.name) === -1) {
          this.availableFiltersArray.push(types.type.name)
        }
      })
    })
  }

  public filterByType(type: string, filterBox: HTMLDivElement): void {

    filterBox.style.borderColor === 'green' ? filterBox.style.borderColor = 'white' : filterBox.style.borderColor = 'green'
    filterBox.style.color === 'green' ? filterBox.style.color = 'white' : filterBox.style.color = 'green'

    this.pokemonListWithDetails = this.pokemonListWithDetailsCopy

    if(this.filtersArray.includes(type)) {
      this.filtersArray = this.filtersArray.filter( existingType => existingType !== type)
    } else {
      this.filtersArray.push(type)
    }

    if (!this.filtersArray.length) {
      this.getAllPokemons(this.offset);
    }

    this.pokemonListWithDetails = this.pokemonListWithDetails.filter(pokemon => {
      let deleteFlag = false;
      pokemon.types.forEach(pokemon => {
        if (this.filtersArray.includes(pokemon.type.name)) {
          deleteFlag = true;
        }
      })

      console.log('filterArray',this.filtersArray)
      return deleteFlag
    })
  }
}
