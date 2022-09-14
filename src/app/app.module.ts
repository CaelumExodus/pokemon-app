import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import {HttpClientModule} from "@angular/common/http";
import { PaginatedListComponent } from './ui/paginated-list/paginated-list.component';
import { PokemonCardComponent } from './ui/pokemon-card/pokemon-card.component';
import { LoaderComponent } from './ui/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PokemonDetailsComponent,
    PaginatedListComponent,
    PokemonCardComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
