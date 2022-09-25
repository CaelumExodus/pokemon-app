import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { EvolutionPageComponent } from "./pages/evolution-page/evolution-page.component";
import { ComparePageComponent } from "./pages/compare-page/compare-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'evolution/:name',
    component: EvolutionPageComponent
  },
  {
    path: 'compare',
    component: ComparePageComponent
  },
  {
    path: '**',
    component: HomePageComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
