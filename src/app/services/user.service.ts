import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {PaginationResponse, User} from "../models";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{
  getCustomers(request: any ): Observable<PaginationResponse<User>> {
    return this.get<any, PaginationResponse<User>>(`users`, request)
  }

  deleteAccount(accountId: number) {
    return this.delete(`users/${accountId}`)
  }

  create(postData: any): Observable<any> {
    return this.post(`users`, postData)
  }

  update(id: number, params: any): Observable<any> {
    return this.put(`users/${id}`, params)
  }
}
