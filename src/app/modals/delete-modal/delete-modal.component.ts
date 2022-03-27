import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Input() item: string;
  @Output() closeDeleteModalPopup= new EventEmitter<Boolean>();
  @Output() itemDeleted= new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    this.itemDeleted.emit(this.item)
  }

  closeModal(){
    this.closeDeleteModalPopup.emit(false);
  }
}
