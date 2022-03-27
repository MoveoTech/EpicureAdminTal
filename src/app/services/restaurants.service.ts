import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  restaurants: Restaurant[] = [];

  constructor(private http: HttpClient) {}

  getAllRestaurants() {
    this.restaurants=[]
    return this.http.get('http://localhost:4000/api/v1/restaurants').pipe(
      map((responseData: Restaurant) => {
        for (const key in responseData) {
          this.restaurants.push(responseData[key]);
        }
        return this.restaurants;
      })
    );
  }

  addRestaurant(obj) {
    console.log(obj);
    return this.http.post(
      'http://localhost:4000/api/v1/restaurants/addRestaurant',
      obj
    );
  }

  updateRestaurant(id, obj) {
    console.log(id, obj);
    return this.http.put(
      `http://localhost:4000/api/v1/restaurants/updateRestaurant/${id}`,
      obj
    );
  }

  deleteRestaurant(id) {
    console.log(id);
    return this.http.delete(
      `http://localhost:4000/api/v1/restaurants/deleteRestaurant/${id}`
    );
  }
}
