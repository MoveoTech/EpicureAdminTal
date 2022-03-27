import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChefsComponent } from "./chefs/chefs.component";
import { DishesComponent } from "./dishes/dishes.component";
import { HomeComponent } from "./home/home.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";

const appRoutes: Routes=[
    {path: '', component: HomeComponent , pathMatch:'full'},
    {path: 'restaurants', component: RestaurantsComponent },
    {path: 'chefs', component: ChefsComponent},
    {path: 'dishes', component: DishesComponent},
   
]
@NgModule({
 imports:[RouterModule.forRoot(appRoutes)],
 exports:[RouterModule]
})
export class AppRoutingModule{

}