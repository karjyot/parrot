import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from "./../services/admin.service";
import { LoginService } from "./../../services/login.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {

  contentForm : FormGroup
  submitted = false
  public custom = {searchText:"",facebook:"",linkedin:"",planBottom:"",google:"",phone:"",secret:"",api:"",parrot:"",twitter:"",planText:"",instagram:"",planLowerSecond:'',planLowerFirst:'',price:''};
  constructor(private loginService: LoginService,private adminService: AdminService,private modalService: BsModalService,private formBuilder:FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router : Router,) { }

  ngOnInit() {
    this.contentForm = this.formBuilder.group({    
      facebook: [''],
      linkedin: [''],
      google: [''],
      phone: [''],
      api: [''],
      instagram:[''],
      twitter:[''],
      parrot:[''],
      planText:[''],
      planBottom:[''],
      searchText:[''],
      planLowerSecond:[''],
      planLowerFirst:[''],
      price:['']
  
  });
  this.loginService.getHomeContent().subscribe((data) => {
    let result = data["success"][0];
    this.custom.facebook = result.facebook
    this.custom.linkedin = result.linkedin
    this.custom.google = result.google
    this.custom.phone = result.phone
    this.custom.api = result.api
    this.custom.price = result.price

    this.custom.parrot = result.parrot
    this.custom.twitter = result.twitter
    this.custom.instagram = result.instagram
    this.custom.planText = result.planText
    this.custom.planBottom = result.planBottom
    this.custom.searchText = result.searchText
    this.custom.planLowerSecond = result.planLowerSecond
    this.custom.planLowerFirst = result.planLowerFirst
    
   }, (err) => {
    this.ngxService.stop();
    
   });

  }
  
  save(){

    this.submitted = true
    if(this.contentForm.invalid){
      return;
    }
    this.ngxService.start();
    this.loginService.updateHomeContent(this.contentForm.value).subscribe((result) => {
      this.router.navigateByUrl('admin/cms');
      this.ngxService.stop();
     this.toastr.success('Content updated succesfully.')
     }, (err) => {
      this.ngxService.stop();
      
     });
  }
}
