import { Component, Input, OnInit } from '@angular/core';
import { IPokemonStats } from "../../core/interfaces/IPokemonStats";
import { IPokemonFilteredStats } from "../../core/interfaces/IPokemonFilteredStats";

@Component({
  selector: 'app-compare-table',
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss']
})
export class CompareTableComponent implements OnInit {

  @Input() firstPokemonAllStats: IPokemonStats[] = []
  @Input() secondPokemonAllStats: IPokemonStats[] = []

  public firstPokemonFilteredStats: IPokemonFilteredStats = {
    HP: '?',
    ATTACK: '?',
    DEFENSE: '?',
    SPEED: '?',
  }

  public secondPokemonFilteredStats: IPokemonFilteredStats = {
    HP: 0,
    ATTACK: '?',
    DEFENSE: '?',
    SPEED: '?',
  }

  constructor() {
  }

  ngOnInit(): void {
    this.firstPokemonAllStats.forEach(pokemonStat => {
      if (pokemonStat.stat.name === 'hp') {
        this.firstPokemonFilteredStats.HP = pokemonStat.base_stat
      } else if (pokemonStat.stat.name === 'attack') {
        this.firstPokemonFilteredStats.ATTACK = pokemonStat.base_stat
      } else if (pokemonStat.stat.name === 'defense') {
        this.firstPokemonFilteredStats.DEFENSE = pokemonStat.base_stat
      } else if (pokemonStat.stat.name === 'speed') {
        this.firstPokemonFilteredStats.SPEED = pokemonStat.base_stat
      }
    })

    this.secondPokemonAllStats.forEach(pokemonStat => {
      if (pokemonStat.stat.name === 'hp') {
        this.secondPokemonFilteredStats.HP = pokemonStat.base_stat
      } else if (pokemonStat.stat.name === 'attack') {
        this.secondPokemonFilteredStats.ATTACK = pokemonStat.base_stat
      } else if (pokemonStat.stat.name === 'defense') {
        this.secondPokemonFilteredStats.DEFENSE = pokemonStat.base_stat
      } else if (pokemonStat.stat.name === 'speed') {
        this.secondPokemonFilteredStats.SPEED = pokemonStat.base_stat
      }
    })
  }

}
