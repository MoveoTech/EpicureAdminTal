import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Chef } from "../models/chefs.model";
import { ChefOfTheWeek } from "../models/chefOfTheWeek.model";

@Injectable({
    providedIn: 'root'
})
export class ChefOfTheWeekService{
    chef: ChefOfTheWeek;
    
    constructor(private http: HttpClient){}

    getChefOfTheWeek(){
    return this.http.get('http://localhost:4000/api/v1/chefOfTheWeek')
        .pipe(map((responseData: Chef)=>{
          for(const key in responseData){
            this.chef=(responseData[key])
          }
        return this.chef
        }))
      }
    
      updateChef(id, obj) {
    
        return this.http.put(
          `http://localhost:8000/api/v1/chefOfTheWeek/updateWeekChef/${id}`,
          obj
        );
      }
}