import {Component, OnInit} from '@angular/core';
import {TourService} from "../service/tour.service";
import {Tour} from "../model/tour";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {
  tours?: Tour[]
  formCreate!: FormGroup;
  idUpdate!: any | undefined
  tourUpdate!: Tour
  formUpdate!: FormGroup;

  titleDetail: string | undefined
  priceDetail : number | undefined
  descriptionDetail: string | undefined


  constructor(private tourService: TourService,
              private fromGroup: FormBuilder) {
  }

  ngOnInit(): void {
    this.displayTours()
    this.formCreate = this.fromGroup.group({
      title: [""],
      price: [""],
      description: [""],
    })
    this.formUpdate = this.fromGroup.group({
      title: [""],
      price: [""],
      description: [""],
    })
  }

  displayTours() {
    this.tourService.findAllTours().subscribe(value => this.tours = value)
  }

  create() {
    let tour = {
      title: this.formCreate.value.title,
      price: this.formCreate.value.price,
      description: this.formCreate.value.description,
    }
    this.tourService.createTour(tour).subscribe(value => {
      alert("Tạo thành công")
      this.ngOnInit()
    })
  }


  update(id: number) {
    this.idUpdate = id
    this.tourService.findOne(id).subscribe(data => {
      this.tourUpdate = data
      this.formUpdate.patchValue(this.tourUpdate)
    })
  }


  updateTour() {
    let tour = {
      id: this.formUpdate.value.id,
      title: this.formUpdate.value.title,
      price: this.formUpdate.value.price,
      description: this.formUpdate.value.description,
    }
    this.tourService.updateTour(this.idUpdate, tour).subscribe(value => {
      this.idUpdate = null
      alert("Sửa thành công")
      this.displayTours()
    })
  }

  delete(id: number) {
    this.idUpdate = id
    this.tourService.deleteTour(id).subscribe(() => {
      this.ngOnInit()
    })
  }

  detail(id: number){
    this.idUpdate = id
    this.tourService.findOne(id).subscribe(data => {
      this.descriptionDetail = data.description
      this.priceDetail = data.price
      this.titleDetail = data.title
    })
    // @ts-ignore
    document.getElementById("detail").hidden = false
  }

  closeDetail(){
    // @ts-ignore
    document.getElementById("detail").hidden = true
  }
}
