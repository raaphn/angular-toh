import { NgModule } from '@angular/core';

//makes so the module can communicate with remote servers
import { HttpClientModule } from '@angular/common/http';

//makes so the module can route addresses
import { RouterModule, Routes } from '@angular/router';
//we will add routing functionality to the following:
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

//Addresses and routes
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //the :id calls the variable from the component
  { path: 'detail/:id', component: HeroDetailComponent},
  { path: 'civics', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent }
];

/*The following metadata makes so the module listens to browser address changes
We also want to communicate with a remote server, so we have the httpclientmodule import*/
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})

//Make so we can call routing wherever its necessary
export class AppRoutingModule { }