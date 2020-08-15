import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from "./../services/login.service";
import { Router } from "@angular/router";
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'app-vehicle-valuation-details',
  templateUrl: './vehicle-valuation-details.component.html',
  styleUrls: ['./vehicle-valuation-details.component.css']
})
export class VehicleValuationDetailsComponent implements OnInit {

  constructor(private _cookieService:CookieService,private loginService: LoginService,private router : Router,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService,private toastr: ToastrService) {}
  vehicleDetails:any;
  ngOnInit() {
    this.vehicleDetails = this.loginService.getValuation();
  }

}
