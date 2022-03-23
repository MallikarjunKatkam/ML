import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from './registration.model';
import { ApiService } from '../shared/api.service';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  formValue !: FormGroup;
  registrationModel: RegistrationModel = new RegistrationModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  totalLength:any;
  page:number=1;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    
  }
  showPost:any=[];
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['',[Validators.required,Validators.pattern("^[a-zA-Z0-9]+$")]],
      lastName: ['',[Validators.required,Validators.pattern("^[a-zA-Z0-9]+$")]],
      mobileNumber: ['',[Validators.required,Validators.pattern("^(0|91)?[6-9]{1}[0-9]{9}$")]],
      emailAddress: ['',[Validators.required,Validators.email]],
      dateOfBirth: ['',[Validators.required,]],
      gender: ['',[Validators.required]]
    })
    this.getAllUserDetails();
    // this.api.getUsers().subscribe((result)=>{
    //   this.showPost=result;
    //   this.totalLength=result;
    //   console.log(this.showPost);
    // })
    // this.items = Array(10).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}` }));
  }
  postUserDetails() {
    this.registrationModel.firstName = this.formValue.value.firstName;
    this.registrationModel.lastName = this.formValue.value.lastName;
    this.registrationModel.mobileNumber = this.formValue.value.mobileNumber;
    this.registrationModel.emailAddress = this.formValue.value.emailAddress;
    this.registrationModel.dateOfBirth = this.formValue.value.dateOfBirth;
    this.registrationModel.gender = this.formValue.value.gender;

    this.api.postUser(this.registrationModel).subscribe(res => {
      console.log(res);
      alert("User Added Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllUserDetails();
    }, err => {
      alert("Something Went Wrong");
    })
  }
  getAllUserDetails() {
    this.api.getUsers().subscribe(res => {
      this.userData = res;
    })
  }

  deleteUser(row: any) {
    this.api.deleteUser(row.id).subscribe(res => {
      alert("User Was Deleted Successfully!");
      this.getAllUserDetails();
    })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.registrationModel.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['mobileNumber'].setValue(row.mobileNumber);
    this.formValue.controls['emailAddress'].setValue(row.emailAddress);
    this.formValue.controls['dateOfBirth'].setValue(row.dateOfBirth);
    this.formValue.controls['gender'].setValue(row.gender);
  }

  updateUserDetails() {
    this.registrationModel.firstName = this.formValue.value.firstName;
    this.registrationModel.lastName = this.formValue.value.lastName;
    this.registrationModel.mobileNumber = this.formValue.value.mobileNumber;
    this.registrationModel.emailAddress = this.formValue.value.emailAddress;
    this.registrationModel.dateOfBirth = this.formValue.value.dateOfBirth;
    this.registrationModel.gender = this.formValue.value.gender;

    this.api.updateUser(this.registrationModel, this.registrationModel.id).subscribe(res => {
      alert("User was Updated Successfully!");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllUserDetails();
    })
  }

  clickAddUser() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
