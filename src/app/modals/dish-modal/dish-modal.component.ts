import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignatureDish } from 'src/app/models/signatureDish.model';

@Component({
  selector: 'app-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.scss']
})
export class DishModalComponent implements OnInit {
  dishForm:FormGroup;
  @Input() message: string;
  @Input() editMode: string;
  @Input() editDish: SignatureDish;
  @Output() dishCreated= new EventEmitter<SignatureDish>();
  @Output() closeModalPopup= new EventEmitter<Boolean>();
  tags: Array<string> =["Spicy", "Vegan", "Vegetarian"]

  constructor() { }

  ngOnInit(): void {
    this.dishForm= new FormGroup({
      _id: new FormControl(this.editDish._id ?this.editDish._id : '' ),
      name: new FormControl(this.editDish.name? this.editDish.name : '',Validators.required),
      image: new FormControl(this.editDish.image? this.editDish.image : ''),
      price: new FormControl(this.editDish.price? this.editDish.price : ''),
      ingredients: new FormControl(this.editDish.ingredients? this.editDish.ingredients : ''),
      tags:new FormArray([]),
    })

  }

  onSubmit(){
    this.dishCreated.emit(this.dishForm.value)
  }

  closeModal(){
    this.closeModalPopup.emit(false);
  }

  onCheckChange(event) {
        
    this.tags.forEach(item=>{
      console.log(item)
      console.log( document.getElementById(item))
    })
    console.log("event: " , event.target.value)
    const formArray: FormArray = this.dishForm.get('tags') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }
  
}
