import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {PageOptions,Account} from "../models";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  getAccounts(request: PageOptions): Observable<Account[]> {
    return this.get<PageOptions, Account[]>(`accounts`, request)
  }

  deleteAccount(accountId: number) {
    return this.delete(`accounts/${accountId}`)
  }

  create(postData: any): Observable<any> {
    return this.http.post(`accounts`, postData)
  }

  update(id: number, params: any): Observable<any> {
    return this.http.put(`accounts/${id}`, params)
  }

}
