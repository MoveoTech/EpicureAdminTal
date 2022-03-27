import { Component, OnInit } from '@angular/core';
import { Chef } from '../models/chefs.model';
import { ChefsService } from '../services/chefs.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss'],
  providers:[ChefsService]
})
export class ChefsComponent implements OnInit {
  chefs: Chef[]=[];
  showDeleteModal: boolean = false;
  deletedChefId: string;
  editMode: string = "add";
  message: string;
  editChef: Chef;
  showModal: boolean = false;

  constructor(private chefsService: ChefsService) { }

  ngOnInit(): void {
    this.chefsService.getAllChefs().subscribe(chefs=>{
      this.chefs=chefs;
      console.log(this.chefs)
  });
  }

  openModal(status: string, chef?: Chef) {
    this.editMode= status;
    this.message= status==="edit"? "Edit Chef" : "Add Chef";
    this.editChef=chef===undefined? {
      _id:'',
      name:'',
      image:'',
      description:''
    } : chef;
    this.showModal = !this.showModal;
  }

  closeModal(status) {
    this.showModal = status;
  }

  openDeleteModal( id:string) {
    this.deletedChefId=id;
    this.showDeleteModal = !this.showDeleteModal;
  }

  closeDeleteModal(status) {
    this.showDeleteModal = status;
  }

  addChef(chef){
    chef._id==="" ? this.chefsService
    .addChef(chef)
    .subscribe((chef) => {
      console.log(chef);
    }) : this.chefsService
    .updateChef( chef._id,chef)
    .subscribe((chef) => {
      console.log(chef);
    })

    this.chefsService.getAllChefs().subscribe(chefs=>{
      this.chefs=chefs;
  });

    this.showModal = false;

  }
  deleteChef(chef) {
    console.log(chef)
    this.chefsService.deleteChef(chef).subscribe((chef) => {
      console.log(chef);
      this.showDeleteModal = false;
    });
    this.chefsService.getAllChefs().subscribe(chefs=>{
      this.chefs=chefs;
  });
  }

}
