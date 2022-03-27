import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chef } from 'src/app/models/chefs.model';
import { SignatureDish } from 'src/app/models/signatureDish.model';
import { ChefsService } from 'src/app/services/chefs.service';
import { DishesService } from 'src/app/services/dishes.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-modal',
  templateUrl: './restaurant-modal.component.html',
  styleUrls: ['./restaurant-modal.component.scss'],
  providers:[ChefsService, DishesService]
})
export class RestaurantModalComponent implements OnInit {
  @Input() message: string;
  @Input() editMode: string;
  @Input() editRestaurant: Restaurant;
  @Output() restaurantCreated= new EventEmitter<Restaurant>();
  @Output() closeModalPopup= new EventEmitter<Boolean>();
  chefs: Chef[];
  dishes: SignatureDish[];
  isPopular: boolean[]=[true, false]
  retstaurantForm: FormGroup;

    constructor(private chefsService: ChefsService, private dishService: DishesService) { }
  
    ngOnInit(): void {
      this.chefsService.getAllChefs().subscribe(chefs=>{
        this.chefs=chefs;
    });
    this.dishService.getAlldishes().subscribe(dish=>{
      this.dishes=dish;
  });
      this.retstaurantForm= new FormGroup({
        _id: new FormControl(this.editRestaurant._id ?this.editRestaurant._id : '' ),
        name: new FormControl(this.editRestaurant.name? this.editRestaurant.name : '',Validators.required),
        image: new FormControl(this.editRestaurant.image? this.editRestaurant.image : ''),
        Chef: new FormControl(this.editRestaurant.Chef? this.editRestaurant.Chef: '',Validators.required),
        signatureDish: new FormControl(this.editRestaurant.signatureDish? this.editRestaurant.signatureDish : '',Validators.required),
        isPopular: new FormControl(this.editRestaurant.isPopular? this.editRestaurant.isPopular : false),
      })
    }

    onSubmit(){
      this.restaurantCreated.emit(this.retstaurantForm.value)
    }
  
    closeModal(){
      this.closeModalPopup.emit(false);
    }
  }
  