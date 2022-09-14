import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from "../../core/services/pokemon.service";
import { IPokemonList } from "../../core/interfaces/IPokemonList";
import { IValueAndId } from "../../core/interfaces/IValueAndId";
import { finalize } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public count = 0;
  public previous: string | null = ''
  public next: string | null = ''
  public pokemonDetailUrlList: IValueAndId[] = [];
  public pokemonListWithDetails: any = [];

  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _httpClient: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.getAllPokemons();


    // this._pokemonService.getSinglePokemon(1).subscribe(
    //   res => console.log(res)
    // )
  }

  public getAllPokemons(offset = 0): void {
    this.pokemonListWithDetails = [];
    this._pokemonService.getAllPokemons(offset).pipe(
      finalize(() => {
        this.getPokemonDetails();
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

}
