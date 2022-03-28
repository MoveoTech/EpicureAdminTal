import { Component, OnInit } from "@angular/core";
import { ChefOfTheWeek } from "../models/chefOfTheWeek.model";
import { Chef } from "../models/chefs.model";
import { ChefOfTheWeekService } from "../services/chefOfTheWeek.service";
import { ChefsService } from "../services/chefs.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-chefs",
  templateUrl: "./chefs.component.html",
  styleUrls: ["./chefs.component.scss"],
  providers: [ChefsService],
})
export class ChefsComponent implements OnInit {
  chefs: Chef[] = [];
  chefOfTheWeek: ChefOfTheWeek;
  showDeleteModal: boolean = false;
  deletedChefId: string;
  editMode: string = "add";
  message: string;
  editChef: Chef;
  showModal: boolean = false;
  chefOfTheWeekForm: FormGroup;

  constructor(
    private chefsService: ChefsService,
    private chefOfTheWeekService: ChefOfTheWeekService
  ) {}

  ngOnInit(): void {
    this.chefsService.getAllChefs().subscribe((chefs) => {
      this.chefs = chefs;
      console.log(this.chefs);
    });
    this.chefOfTheWeekService.getChefOfTheWeek().subscribe((chef) => {
      this.chefOfTheWeek = chef;
    });
    this.chefOfTheWeekForm = new FormGroup({
      ChefId: new FormControl(this.chefOfTheWeek? this.chefOfTheWeek : '')
  });
  }

  openModal(status: string, chef?: Chef) {
    this.editMode = status;
    this.message = status === "edit" ? "Edit Chef" : "Add Chef";
    this.editChef =
      chef === undefined
        ? {
            _id: "",
            name: "",
            image: "",
            description: "",
          }
        : chef;
    this.showModal = !this.showModal;
  }

  closeModal(status) {
    this.showModal = status;
  }

  openDeleteModal(id: string) {
    this.deletedChefId = id;
    this.showDeleteModal = !this.showDeleteModal;
  }

  closeDeleteModal(status) {
    this.showDeleteModal = status;
  }

  addChef(chef) {
    chef._id === ""
      ? this.chefsService.addChef(chef).subscribe((chef) => {
          console.log(chef);
        })
      : this.chefsService.updateChef(chef._id, chef).subscribe((chef) => {
          console.log(chef);
        });

    this.chefsService.getAllChefs().subscribe((chefs) => {
      this.chefs = chefs;
    });

    this.showModal = false;
  }
  deleteChef(chef) {
    console.log(chef);
    this.chefsService.deleteChef(chef).subscribe((chef) => {
      console.log(chef);
      this.showDeleteModal = false;
    });
    this.chefsService.getAllChefs().subscribe((chefs) => {
      this.chefs = chefs;
    });
  }

  updateChefOfTheWeek(){
    this.chefOfTheWeekService.updateChef(this.chefOfTheWeek._id, this.chefOfTheWeekForm.value).subscribe((chef) => {
      this.chefOfTheWeekService.getChefOfTheWeek().subscribe((chef) => {
        this.chefOfTheWeek = chef;
      });
    });

  }
}
