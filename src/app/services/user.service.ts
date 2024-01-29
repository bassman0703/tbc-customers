import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {last, Observable} from "rxjs";
import {User, UserRequest} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "http://localhost:3000"

  constructor(private http: HttpClient) { }
  getUserList(request: UserRequest): Observable<User[]>  {
    const {first, last, sortOrder, sortField, filter} = request
    const page = (first/last) + 1;
    let urlParams = `_page=${page}&_per_page=${last}`
    if (sortField){
        urlParams += `&_sort=${sortField}&_order=${sortOrder === 1 ?'asc' : 'desc'}`
    }
    if(filter && filter.clientNumber){
      urlParams += `&clientNumber_like=${filter.clientNumber}`
    }
    return this.http.get<User[]>(`${this.url}/users?${urlParams}`)
  }
  addEditUser(postData: any, selectedUser: any) {
    if ( !selectedUser){
      return this.http.post(this.url, postData)
    } else {
      return this.http.put(`http://localhost:3000/users/${selectedUser.id}`, postData)
    }
  }
  deleteUser(userId: number){
    return this.http.delete( `http://localhost:3000/users/${userId}` )
  }

  create(postData: any) {
    return this.http.post(this.url, postData)
  }

  update(selectedUser: any, postData: any) {
    return this.http.put(`http://localhost:3000/users/${selectedUser.id}`, postData)
  }
}
