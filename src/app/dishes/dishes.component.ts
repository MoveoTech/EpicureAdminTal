import { Component, OnInit } from '@angular/core';
import { SignatureDish } from '../models/signatureDish.model';
import { DishesService } from '../services/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  providers:[DishesService]
})
export class DishesComponent implements OnInit {
  dishes: SignatureDish[]=[];
  showDeleteModal: boolean = false;
  deletedDishId: string;
  editMode: string = "add";
  message: string;
  editDish: SignatureDish;
  showModal: boolean = false;

  constructor(private dishesService: DishesService) { }

  ngOnInit(): void {
    this.dishesService.getAlldishes().subscribe(dishes=>{
      this.dishes=dishes;
      console.log(this.dishes)
  });
  }

  openModal(status: string, dish?: SignatureDish) {
    this.editMode= status;
    this.message= status==="edit"? "Edit Chef" : "Add Chef";
    this.editDish=dish===undefined? {
      _id:'',
      name:'',
      image:'',
      price:0,
      ingredients:"",
      tags:[]
    } : dish;
    this.showModal = !this.showModal;
  }

  closeModal(status) {
    this.showModal = status;
  }
  openDeleteModal( id:string) {
    this.deletedDishId=id;
    this.showDeleteModal = !this.showDeleteModal;
  }

  closeDeleteModal(status) {
    this.showDeleteModal = status;
  }
  deleteDish(dish) {
    this.dishesService.deleteDish(dish).subscribe((dish) => {
      console.log(dish);
      this.showDeleteModal = false;
    });
    this.dishesService.getAlldishes().subscribe(dishes=>{
      this.dishes=dishes;
  });
  }
   
  addDish(dish){
    dish._id==="" ? this.dishesService
    .addDish(dish)
    .subscribe((dish) => {
      console.log(dish);
    }) : this.dishesService
    .updateDish( dish._id,dish)
    .subscribe((dish) => {
      console.log(dish);
    })

    this.dishesService.getAlldishes().subscribe(dishes=>{
      this.dishes=dishes;
  });

    this.showModal = false;

  }
}
