import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from "../../core/services/pokemon.service";
import { ISinglePokemon } from "../../core/interfaces/ISinglePokemon";
import { finalize } from "rxjs";
import { RegionService } from "../../core/services/region.service";
import { ITrainerInfo } from "../../core/interfaces/ITrainerInfo";

@Component({
  selector: 'app-trainer-details-modal',
  templateUrl: './trainer-details-modal.component.html',
  styleUrls: ['./trainer-details-modal.component.scss']
})
export class TrainerDetailsModalComponent implements OnInit {

  @Output() trainerDataSaved = new EventEmitter<ITrainerInfo>();

  public isLoading = true;
  public iteration = 0
  trainerInfo = {
    trainerName: '',
    trainerLocation: '',
    pokemonName: ''
  }
  public randomPokemonsArray: ISinglePokemon[] = [];
  public regionArray: string[] = [];

  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _regionService: RegionService,
  ) {
  }

  ngOnInit(): void {
    this.getThreeRandomPokemons();

    this._regionService.getRegions().subscribe(
      res => {
        this.regionArray
        res.results.forEach(region => this.regionArray.push(region.name))
      },
      err => console.log(err)
    )
  }

  public getThreeRandomPokemons(): void {
    let randomPokemonIndex = Math.floor(Math.random() * (1200 - 1 + 1) + 1)

    this._pokemonService.getSinglePokemon(randomPokemonIndex).pipe(
      finalize(() => {
        if (this.randomPokemonsArray.length === 3) {
          this.isLoading = false
        } else {
          this.getThreeRandomPokemons();
        }
      })
    ).subscribe(
      res => {
        this.randomPokemonsArray.push(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  public chosePokemon(name: string, card: HTMLDivElement): void {
    const resetBorder = document.querySelector('.selected-card')

    if (resetBorder) {
      resetBorder.classList.remove('selected-card')
    }

    card.classList.add('selected-card')

    this.trainerInfo.pokemonName = name;
  }

  public saveTrainerData(): void {
    localStorage.setItem('trainerName', this.trainerInfo.trainerName)
    localStorage.setItem('trainerLocation', this.trainerInfo.trainerLocation)
    localStorage.setItem('pokemonName', this.trainerInfo.pokemonName)

    this.trainerDataSaved.emit(this.trainerInfo)
  }
}
