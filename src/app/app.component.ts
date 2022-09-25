import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgxSmartModalService } from "ngx-smart-modal";
import { ITrainerInfo } from "./core/interfaces/ITrainerInfo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'pokemon-app';

  public trainerInfo: ITrainerInfo = {
    trainerName: localStorage.getItem('trainerName') ? localStorage.getItem('trainerName') : '',
    trainerLocation: localStorage.getItem('trainerLocation') ? localStorage.getItem('trainerLocation') : '',
    pokemonName: localStorage.getItem('pokemonName') ? localStorage.getItem('pokemonName') : '',
  }

  constructor(
    public readonly ngxSmartModalService: NgxSmartModalService,
    private readonly _cdr: ChangeDetectorRef
  ) {
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.ngxSmartModalService.getModal('trainerModal').open()
    }, 5000)
  }

  public test(trainerInfo: ITrainerInfo) {
    this.trainerInfo = trainerInfo;

    this.ngxSmartModalService.getModal('trainerModal').close();
    this._cdr.detectChanges();
  }
}
