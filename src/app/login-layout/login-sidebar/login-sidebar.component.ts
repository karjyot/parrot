import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from "./../../services/login.service";
@Component({
  selector: 'app-login-sidebar',
  templateUrl: './login-sidebar.component.html',
  styleUrls: ['./login-sidebar.component.css']
})
export class LoginSidebarComponent implements OnInit {

  constructor(private router: Router,private loginService: LoginService) { }
  isLogin : any;
  userDetails:any;
  imageUrl:any
  totalAmount:any
  remaining:any
  usedAmount:any;
  wallet:any
  ngOnInit() {
    this.userDetails = this.loginService.getUserDetails()
    if(this.userDetails){
      this.imageUrl = this.userDetails.image;
    }

    this.loginService.getWalletSummary(this.loginService.getUserDetails().id).subscribe((result:any) => {
      this.wallet = result['success'];
      let used = result['used'];
      let total = 0;
      let totalUsed = 0;
      for(var i=0; i<this.wallet.length; i++){
        total = Number(total) + parseFloat(this.wallet[i].amount);
      }

      for(var i=0; i<used.length; i++){
        totalUsed = Number(totalUsed) + parseFloat(used[i].amount);
      }
      this.totalAmount = total;
      this.usedAmount = totalUsed;

      this.remaining = total -  totalUsed;
      //this.ngxService.stop();
      },(err) => {
       try{
         let errMessage = err["error"]["message"];
        // this.toastr.error(errMessage);
        }catch(e){
 
        }
        //this.ngxService.stop();
       })
  
  }
  ngAfterViewInit(){
    
  this.loginService.userType$.subscribe((data) => {
    this.userDetails.user_type = data;
  })
  this.loginService.imageUrl$.subscribe((data) => {
    this.imageUrl = data;
})
this.loginService.userName$.subscribe((data) => {
  this.userDetails.name = data;
})


}
  urlmatch(url){
    return this.router.url.includes(url);
 }
 logout(){
  this.loginService.deleteToken();
  this.loginService.deleteUserDetails();
  this.isLogin = false;
  this.loginService.sendLogout(false); 
  this.router.navigateByUrl('/register', {skipLocationChange: true}).then(()=>
  this.router.navigate(["/"])); 
 }
}
