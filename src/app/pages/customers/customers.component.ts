import {Component, inject} from "@angular/core";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import { map, switchMap, tap} from "rxjs";
import {pageOptions} from "../../models";
import {UserService} from "../../services";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {HeaderComponent} from "../header/header.component";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzModalService} from "ng-zorro-antd/modal";
import {AddOrEditCustomersComponent} from "./add-or-edit-customers/add-or-edit-customers.component";


@Component({
  selector: 'app-customers',
  standalone: true,
  templateUrl: 'customers.component.html',
  imports: [
    CommonModule,
    AsyncPipe,
    JsonPipe,
    RouterModule,
    NzTableModule,
    NzDividerComponent,
    HeaderComponent,
    NzPaginationComponent,
    AddOrEditCustomersComponent
  ],
  providers:[NzModalService],
  styleUrl: 'customers.component.scss'
})
export class CustomersComponent {
  customerService = inject(UserService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  page = 1
  pageSize = 10
  total = 0
constructor(
  private modal: NzModalService
) {
}

  customers$ = this.route.queryParams.pipe(
    map( (route) => {
      this.page = route['page'];
      this.pageSize = route['pageSize']
      return {
        page: this.page,
        pageSize: this.pageSize
      }
    }),
    switchMap((params) => {
      return this.customerService.getAccounts(pageOptions(params.page, params.pageSize)).pipe(
        tap(
          (res) => {
            this.total = res.items || 0;
          }
        )
      )
    })
  )

  paginationChange(
    page: number
  ) {
    console.log(page)
    this.router.navigate(['/customers'], {
      queryParams: {
        page: page,
        pageSize: 10
      },
      queryParamsHandling: 'merge'
    }).then()
  }
  add() {
    this.modal.create({
      nzTitle: 'დამატება/რედაქტირება',
      nzContent: AddOrEditCustomersComponent,
      nzWidth: '750px',
      nzData: {
        view: false,
      },
      nzOnOk: () => {
        // this.customers$()
      }
    });
  }
}
