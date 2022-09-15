import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from "../../core/services/pokemon.service";
import { IValueAndId } from "../../core/interfaces/IValueAndId";
import { finalize, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { EvolutionService } from "../../core/services/evolution.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public count = 0;
  public previous: string | null = ''
  public next: string | null = ''
  public pokemonDetailUrlList: IValueAndId[] = [];
  public pokemonListWithDetails: any = [];

  private _subArray: Subscription[] = [];

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
    this.getAllPokemons();
  }

  public getAllPokemons(offset = 0): void {
    this.isLoading = true;
    this.pokemonListWithDetails = [];
    this._pokemonService.getAllPokemons(offset).pipe(
      finalize(() => {
        this.getPokemonDetails();
        this.isLoading = false;
      })
    ).subscribe(
      res => {
        this.count = res.count
        this.previous = res.previous
        this.next = res.next;
        this.pokemonDetailUrlList = res.results;
      }
    )
  }

  public getPokemonDetails() {
    this.pokemonDetailUrlList.forEach(pokemon => {
      this._httpClient.get(pokemon.url).pipe().subscribe(
        res => {
          this.pokemonListWithDetails.push(res)
        }
      )
    })
  }

  ngOnDestroy() {
    this._subArray.forEach(subscription => subscription.unsubscribe());
  }
}
