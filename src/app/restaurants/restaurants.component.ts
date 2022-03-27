import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  providers: [RestaurantsService],
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  editMode: string = "add";
  message: string;
  editRestaurant: Restaurant;
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  deletedRestaurantId: string;
  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantsService.getAllRestaurants().subscribe((restaurant) => {
      this.restaurants = restaurant;
      console.log(this.restaurants);
    });
  }

  openModal(status: string, restaurant?: Restaurant) {
    this.editMode= status;
    this.message= status==="edit"? "Edit Restaurant" : "Add Restaurant";
    this.editRestaurant=restaurant===undefined? {
      _id:'',
      name:'',
      image:'',
      Chef:null,
      signatureDish:null,
      isPopular: false
    } : restaurant;
    this.showModal = !this.showModal;
  }

  openDeleteModal( id:string) {
    this.deletedRestaurantId=id;
    this.showDeleteModal = !this.showDeleteModal;
  }

  closeModal(status) {
    this.showModal = status;
  }
  closeDeleteModal(status) {
    this.showDeleteModal = status;
  }
  addRestaurant(Restaurant) {
    console.log(Restaurant)
    Restaurant._id==="" ? this.restaurantsService
    .addRestaurant(Restaurant)
    .subscribe((restaurant) => {
      console.log(restaurant);
    }) : this.restaurantsService
    .updateRestaurant( Restaurant._id,Restaurant)
    .subscribe((restaurant) => {
      console.log(restaurant);
    })

    this.restaurantsService.getAllRestaurants().subscribe((restaurant) => {
      this.restaurants = restaurant;
    });
    this.showModal = false;
  }

  deleteRestaurant(restaurant) {
    this.restaurantsService.deleteRestaurant(restaurant).subscribe((restaurant) => {
      console.log(restaurant);
      this.showDeleteModal = false;
    });

    this.restaurantsService.getAllRestaurants().subscribe((restaurant) => {
      this.restaurants = restaurant;
    });

  }
}
