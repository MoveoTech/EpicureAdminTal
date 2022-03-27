import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SignatureDish } from "../models/signatureDish.model";

@Injectable({
    providedIn: 'root'
})
export class DishesService{
    dishes: SignatureDish[]=[];
    
    constructor(private http: HttpClient){}

    getAlldishes(){
      this.dishes=[]
    return this.http.get('http://localhost:4000/api/v1/dishes')
        .pipe(map((responseData: SignatureDish)=>{
          for(const key in responseData){
            this.dishes.push(responseData[key])
          }
        return this.dishes
        }))
      }
      addDish(obj) {
        console.log(obj);
        return this.http.post(
          'http://localhost:4000/api/v1/dishes/addDish',
          obj
        );
      }
    
      updateDish(id, obj) {
        console.log(id, obj);
        return this.http.put(
          `http://localhost:4000/api/v1/dishes/updateDish/${id}`,
          obj
        );
      }

      deleteDish(id) {
        return this.http.delete(
          `http://localhost:4000/api/v1/dishes/deleteDish/${id}`
        );
      }
}