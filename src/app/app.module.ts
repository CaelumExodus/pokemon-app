import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from "@angular/common/http";
import { PaginatedListComponent } from './ui/paginated-list/paginated-list.component';
import { PokemonCardComponent } from './ui/pokemon-card/pokemon-card.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { SkeletonLoaderComponent } from './ui/skeleton-loader/skeleton-loader.component';
import { EvolutionPageComponent } from './pages/evolution-page/evolution-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PaginatedListComponent,
    PokemonCardComponent,
    LoaderComponent,
    SkeletonLoaderComponent,
    EvolutionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}