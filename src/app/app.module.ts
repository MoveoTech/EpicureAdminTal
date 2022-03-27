import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ChefsComponent } from './chefs/chefs.component';
import { AppRoutingModule } from './app-routing.module';
import { DishesComponent } from './dishes/dishes.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { RestaurantModalComponent } from './modals/restaurant-modal/restaurant-modal.component';
import { ChefModalComponent } from './modals/chef-modal/chef-modal.component';
import { DishModalComponent } from './modals/dish-modal/dish-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantsComponent,
    ChefsComponent,
    DishesComponent,
    DeleteModalComponent,
    RestaurantModalComponent,
    ChefModalComponent,
    DishModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
