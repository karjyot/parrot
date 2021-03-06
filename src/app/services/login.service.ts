import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import {AppSettings } from './../constants';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  userData: any; 
  catData:any

  private logoutType: Subject<any> = new Subject<any>();
  private messageType: Subject<any> = new Subject<any>();
  public updateMessage$  = this.messageType.asObservable();
  public logoutType$ = this.logoutType.asObservable();

  private userName: Subject<any> = new Subject<any>();
  public userName$ = this.userName.asObservable();
  public sendUserNameUpdate(data: any){
    console.log(data)
    this.userName.next(data);
  }

  public sendLogout(data: any){

    this.logoutType.next(data);
}
updateMessageStatus(jsonPayload):Observable<any>{
  return this.http.post(AppSettings.API_ENDPOINT + 'updateMessageStatus',jsonPayload);
}

public messageData(data: any){
  
  this.messageType.next(data);
}
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) { }

  login(authCredentials) {
    return this.http.post(AppSettings.API_ENDPOINT + 'login', authCredentials,this.noAuthHeader);
  }
  payAdmin(authCredentials){
    return this.http.post(AppSettings.API_ENDPOINT + 'payAdmin', authCredentials,this.noAuthHeader);
  }
  saveBankInfo(authCredentials,id){
    return this.http.post(AppSettings.API_ENDPOINT + 'saveBankInfo/'+id, authCredentials,this.noAuthHeader);
  }
  getRecivedMessage(id) {
    return this.http.get(AppSettings.API_ENDPOINT + 'getRecivedMessage/'+id);
  }
  carriersData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/carriers');
  }

  bikeData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/bikeData');
  }
  carData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/carData');
  }
  truckData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/truckData');
  }
  vehicleData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/vehicleData');
  }
  faqData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/faqData');
  }
  worksData() {
    return this.http.get(AppSettings.API_ENDPOINT + 'admin/worksData');
  }


  addbikeData(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addbikeData',data);
  }
  addcarData(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addcarData',data);
  }
  addtruckData(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addtruckData',data);
  }
  addvehicleData(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addvehicleData',data);
  }
  addfaqData(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addfaqData',data);
  }
  addworksData(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'admin/addWorksData',data);
  }



  
  getPaymentRequests(id) {
    return this.http.get(AppSettings.API_ENDPOINT + 'getPaymentRequests/'+id);
  }
  getReferalPayments() {
    return this.http.get(AppSettings.API_ENDPOINT + 'getReferalPayments');
  }
  getUnreadMessage(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getUnreadMessage/'+id);
  }
  setUnreadMessages(data:any){
    this.localStorage.setItem('unread',  JSON.stringify(data));
  }
  getUnreadMessages(){
    let details = this.localStorage.getItem('unread');
    return JSON.parse(details);
  }
  getThreads(id,fromId) {
    return this.http.get(AppSettings.API_ENDPOINT + 'getThreads/'+id + '/'+fromId);
  }
  sentMessage(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'sentMessage/'+id);
  }
  sendMessage(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'sendMessageUser',jsonPayload);
  }
  sellerContact(data) {
    return this.http.post(AppSettings.API_ENDPOINT + 'sellerContact', data,this.noAuthHeader);
  }
  messageUser(data){
    return this.http.post(AppSettings.API_ENDPOINT + 'sendMessage', data,this.noAuthHeader);
  }
  reportAD(data){
    return this.http.post(AppSettings.API_ENDPOINT + 'reportAD', data,this.noAuthHeader);
  }
  listAds(searchData){
    return this.http.post(AppSettings.API_ENDPOINT + 'listAds',searchData,this.noAuthHeader);
  }
  confirmNewPassword(newPassword) {
    return this.http.post(AppSettings.API_ENDPOINT + 'confirmPassword', newPassword,this.noAuthHeader);
  }
  forgotPassword(email) {
    return this.http.post(AppSettings.API_ENDPOINT + 'checkEmailExists', email,this.noAuthHeader);
  }

  referal(email) {
    return this.http.post(AppSettings.API_ENDPOINT + 'referal', email,this.noAuthHeader);
  }
  listUserReferencese(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'listUserReferencese/'+id);
  }
  validateFogetToken(token) {
    return this.http.post(AppSettings.API_ENDPOINT + 'validateFogetToken', token,this.noAuthHeader);
  }
  //Helper Methods

  setToken(token: string) {
    console.log(token)
    this.localStorage.setItem('token', token);
  }
  setUserDetails(data:any){
    this.localStorage.setItem('userDetailsPAT',  JSON.stringify(data));
  }
  
  getUserDetails(){
    let details = this.localStorage.getItem('userDetailsPAT');
    return JSON.parse(details || "null");
  }

  setCms(data:any){
    this.localStorage.setItem('cms',  JSON.stringify(data));
  }
  
  getCms(){
    let details = this.localStorage.getItem('cms');
    return JSON.parse(details);
  }

  private data;
  setData(data){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }
  setSearchData(data:any){
    this.localStorage.setItem('searchData',  JSON.stringify(data));
  }
  
  getSearchData(){
    let details = this.localStorage.getItem('searchData');
    return JSON.parse(details);
  }

  deleteSearchData() {
    this.localStorage.removeItem('searchData');
  }

  setSellerDetails(data:any){
    this.localStorage.setItem('sellerDetails',  JSON.stringify(data));
  }
  
  getsetSellerDetails(){
    let details = this.localStorage.getItem('sellerDetails');
    return JSON.parse(details);
  }
  setSocialDetails(data:any){
    this.localStorage.setItem('socialDetails',  JSON.stringify(data));
  }

  setSearchRecords(data){
    this.localStorage.setItem('setSearchRecords',  JSON.stringify(data));
  }


  getSearchRecords(data){
    let details = this.localStorage.getItem('setSearchRecords');
    return JSON.parse(details);
  }

  deleteSearchRecords() {
    this.localStorage.removeItem('setSearchRecords');
  }
  
  deletePlanStorage() {
    this.localStorage.removeItem('planDetails');
  }
  
  getSocialDetails(){
    let details = this.localStorage.getItem('socialDetails');
    return JSON.parse(details);
  }
  
  
  getToken() {
    return this.localStorage.getItem('token');
  }
  deleteUserDetails() {
    this.localStorage.removeItem('userDetailsPAT');
  }
  deleteToken() {
    this.localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      try{
        var userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }catch(e){
        return token;
      }
     
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  registerUser(jsonPayload):Observable<any>{
    return this.http.post(AppSettings.API_ENDPOINT + 'register',jsonPayload,this.noAuthHeader);
  }

  getWalletSummary(id){
    return this.http.get(AppSettings.API_ENDPOINT + 'getWalletSummary/'+id,this.noAuthHeader);
  }

  withdrawRequest(id,postData){
    return this.http.post(AppSettings.API_ENDPOINT + 'withdrawRequest/'+id,postData,this.noAuthHeader);
  }


  
  privacy() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/privacy');
  }

  terms() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/terms');
  }

  about() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'admin/about');
  }

  contact(data) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'contact',data);
  }

  validateUser(email) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'validateUser/'+email);
  }
  getPostDetails(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getPostDetails/'+id);
  }
  getNewsDetails(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'newsDetails/'+id);
  }


  //Dont delete
  listRecords() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'domains');
  }

  listRecordsAdmin() {
    return this.http.get(AppSettings.API_ENDPOINT  + 'getDomainsAdmin');
  }

  listOrders(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'backorders/'+id);
  }
  deleteAd(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteAd/'+id);
  }
  deleteSearch(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteSearch/'+id);
  }

  deleteBookmark(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'deleteBookmark/'+id);
  }

  listHandpicks(id) {
    return this.http.get(AppSettings.API_ENDPOINT  + 'myDomains/'+id);
  }

  addOrder(data,id) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'order/'+id,data);
  }
  addBackorder(data,id) {
    return this.http.post(AppSettings.API_ENDPOINT  + 'addBackorder/'+id,data);
  }
  private imageUrl: Subject<any> = new Subject<any>();
  public imageUrl$ = this.imageUrl.asObservable();
  public sendImageUpdate(data: any){
    this.imageUrl.next(data);
}
private userType: Subject<any> = new Subject<any>();
public userType$ = this.userType.asObservable();
public sendUserTypeUpdate(data: any){
  this.userType.next(data);
}

updateProfileImage(jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'updateProfileImage',jsonPayload);
}
updateUser(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateUser/'+id,jsonPayload);
}
subscribeEmail(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'subscribe',jsonPayload);
}
activate(jsonPayload):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'activateSubscribe',jsonPayload);
}
listCountries() {
  return this.http.get(AppSettings.API_ENDPOINT  + 'countries');
}

addRecord(jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'addDomain',jsonPayload);
}
editRecord(id,jsonPayload){
  return this.http.post(AppSettings.API_ENDPOINT + 'editDomain/'+id,jsonPayload);
}
deleteRecord(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteDomain/'+id);
}

makeSponsar(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'makeSponsar/'+id);
}
getAdsAdmin(){
  return this.http.get(AppSettings.API_ENDPOINT + 'getAdminAds');
}

getAdminHandpicked(){
  return this.http.get(AppSettings.API_ENDPOINT + 'adminHandpicked');
}
getHomeContent(){
  return this.http.get(AppSettings.API_ENDPOINT + 'getContent');
}
updateHomeContent(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'updateHomeContent',data);
}
changeUserPassword(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'changeUserPassword',data);
}

verifyAccount(data){
  return this.http.get(AppSettings.API_ENDPOINT + 'verifyAccount/'+data);
}

plans(){
  return this.http.get(AppSettings.API_ENDPOINT + 'plans');
}

setPlanDetails(data:any){
  this.localStorage.setItem('planDetails',  JSON.stringify(data));
}

getPlanDetails(){
  let details = this.localStorage.getItem('planDetails');
  return JSON.parse(details);
}
makePayment(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'makePayment',data);
}

makePaymentSponsar(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'makePaymentSponsar',data);
}


makePaymentZero(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'makePaymentZero',data);
}

setPlan(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'setPlan',data);
}
registerSocial(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'registerSocial',data);
}
firstTimeSocial(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'firstTimeSocial',data);
}

createAd(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'createAd',data);
}
updateAd(data,id){
  return this.http.post(AppSettings.API_ENDPOINT + 'updateAd/'+id,data);
}
deleteAdImage(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteAdImage/'+id);
}
payWalletUser(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'payWallet',data);
}

bookmark(data){
  return this.http.post(AppSettings.API_ENDPOINT + 'bookmark',data);
}


userAdsGet(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'userContent/'+id);
}
userAdPlan(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'userAdPlan/'+id);
}

setUserDealerPlan(data){
  this.localStorage.setItem('setUserDealerPlan',  JSON.stringify(data));
}

getUserDealerPlan(){
  let details = this.localStorage.getItem('setUserDealerPlan');
  return JSON.parse(details);
  
}
updateCount(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'updateCount/'+id);
}

getUserPlans(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'getPlanInfo/'+id);
}

getBookmarks(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'getbookmark/'+id);
}
adDetails(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'adDetails/'+id);
}
getAdDetails(){
  let details = this.localStorage.getItem('adDetails');
  return JSON.parse(details);
}
setadDetails(data){
  this.localStorage.setItem('adDetails',  JSON.stringify(data));
}
bookmarkDetails(id,userId){
  return this.http.get(AppSettings.API_ENDPOINT + 'listBookMarks/'+id + '/'+userId);
}
listBookMarksAll(id){
  return this.http.get(AppSettings.API_ENDPOINT + 'listBookMarksAll/'+id);
}
filterSearch(data,type){
  return this.http.post(AppSettings.API_ENDPOINT + 'filterSearch/'+type,data);
}

getMakes() {
  return this.http.get(AppSettings.API_ENDPOINT + 'getMake');
}

getModels(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'getModel/'+id);
}
getEqp() {
  return this.http.get(AppSettings.API_ENDPOINT + 'getEqp');
}

saveSearch(data,id,type) {
  return this.http.post(AppSettings.API_ENDPOINT + 'saveSearch/'+id+'/'+type,data);
}

getSavedSearches(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'getSavedSearches/'+id);
}



addCategory(data) {
  return this.http.post(AppSettings.API_ENDPOINT + 'addCategory',data);
}

deleteCategory(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteCategory/'+id);
}

listCategories() {
  return this.http.get(AppSettings.API_ENDPOINT + 'listCategories');
}

addBlog(data) {
  return this.http.post(AppSettings.API_ENDPOINT + 'addBlog',data);
}

deleteBlog(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteBlog/'+id);
}

listBlogs() {
  return this.http.get(AppSettings.API_ENDPOINT + 'listBlogs');
}
listComments(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'listComments/'+id);
}

blogDetails(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'blogDetails/'+id);
}

updateBlog(jsonPayload,id):Observable<any>{  
  return this.http.post(AppSettings.API_ENDPOINT + 'updateBlog/'+id,jsonPayload);
}

addCommentBlog(data) {
  return this.http.post(AppSettings.API_ENDPOINT + 'addComment',data);
}
filterBlogsData(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'filterBlogsData/'+id);
}

listCommentsAdmin() {
  return this.http.get(AppSettings.API_ENDPOINT + 'listCommentsAdmin');
}


deleteComment(id) {
  return this.http.get(AppSettings.API_ENDPOINT + 'deleteComment/'+id);
}

vehicleCheck(data) {
  
  return this.http.post(AppSettings.API_ENDPOINT + 'getVehicleInfo',data);
}
mileageCheck(data) {
  console.log(data)

  var params = 'RegistrationNumber='+data.registrationNumber+'&mileage='+data.mileage+'&username=Prosper';
  let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) ;
 let response = this.http.post('https://www.regcheck.org.uk/api/bespokeapi.asmx/CheckPrice',params,{headers:headers,responseType:'text'});
  return response
}
setVehicleCheck(data:any){
  this.localStorage.setItem('setVehicleCheck',  JSON.stringify(data));
}

getVehicleCheck(){
  let details = this.localStorage.getItem('setVehicleCheck');
  return JSON.parse(details);
}
setValuation(data:any){
  this.localStorage.setItem('setValuation',  JSON.stringify(data));
}

getValuation(){
  let details = this.localStorage.getItem('setValuation');
  return JSON.parse(details);
}
}