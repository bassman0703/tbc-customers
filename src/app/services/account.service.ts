import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Account, AccountRequest} from "../interfaces/account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string = "http://localhost:3000"

  constructor(private http: HttpClient) { }


  getAccountList(request: AccountRequest): Observable<Account[]>  {
    const {first, last, sortOrder, sortField, filter} = request
    const page = (first/last) + 1;
    let urlParams = `_page=${page}1&_limit=${last}`
    if (sortField){
      urlParams += `&_sort=${sortField}&_order=${sortOrder === 1 ?'asc' : 'desc'}`
    }
    if(filter && filter.clientNumber){
      urlParams += `&clientNumber_like=${filter.clientNumber}`
    }
    return this.http.get<Account[]>(`${this.url}/accounts?${urlParams}`)
  }
  deleteAccount(accountId: number){
    return this.http.delete( `http://localhost:3000/accounts/${accountId}` )
  }

  addEditAccount(postData: any, selectedAccount: any) {
    if ( !selectedAccount){
      return this.http.post(this.url, postData)
    } else {
      return this.http.put(`http://localhost:3000/users/${selectedAccount.id}`, postData)
    }
  }

}
