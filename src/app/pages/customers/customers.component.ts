import {Component, inject} from "@angular/core";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {filter, map, Observable, switchMap, tap} from "rxjs";
import {pageOptions, PaginationResponse, User} from "../../models";
import {UserService} from "../../services";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {NzTableModule, NzTableQueryParams} from "ng-zorro-antd/table";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {HeaderComponent} from "../header/header.component";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzModalService} from "ng-zorro-antd/modal";
import {AddOrEditCustomersComponent} from "./add-or-edit-customers/add-or-edit-customers.component";
import {PaginationModule} from "../../elements";
import {TableWrapperComponent} from "../../shared/table-wrapper/table-wrapper.component";
import {log} from "ng-zorro-antd/core/logger";
import {FormsModule} from "@angular/forms";
import {NzInputDirective, NzInputModule} from "ng-zorro-antd/input";


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
    AddOrEditCustomersComponent,
    PaginationModule,
    TableWrapperComponent,
    FormsModule,
    NzInputModule
  ],
  providers: [NzModalService],
  styleUrl: 'customers.component.scss'
})
export class CustomersComponent {
  customerService = inject(UserService)
  route = inject(ActivatedRoute)
  router = inject(Router)
  page = 1
  pageSize = 10
  total = 0
  orderBy = 'createAt';
  order: 'ASC' | 'DESC' = 'DESC';
  search: string | null = null;
  filterData: string = ''

  constructor(
    private modal: NzModalService
  ) {
  }

  customers$ = this.route.queryParams.pipe(
    map((route) => {
      this.page = route['page'] || this.page;
      this.pageSize = route['pageSize'] || this.pageSize;
      this.orderBy = route['orderBy'] || this.orderBy;
      this.order = route['order'] || this.order;
      console.log(this.page)
      return {
        page: this.page,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        order: this.order,
        firsName: route['firsName']
      }
    }),
    switchMap((params) => {
      return this.customerService.getCustomers(pageOptions(params.page, params.pageSize, params.order, params.orderBy)).pipe(
        tap(
          (res: PaginationResponse<User>) => {
            this.total = res.items || 0;
          }
        )
      )
    })
  )

  paginationChange(
    data: NzTableQueryParams
  ) {
    console.log(data)
    const {pageSize, pageIndex, sort, filter} = data;
    const currentSort = sort.find(item => item.value !== null);
    if (currentSort) {
      this.orderBy = (currentSort && currentSort.key);
      this.order = (currentSort && currentSort.value) === 'ascend' ? 'ASC' : 'DESC';
    }
    this.router.navigate(['/customers'], {
      queryParams: {
        page: data.pageIndex,
        pageSize: data.pageSize,
        orderBy: this.orderBy,
        order: this.order
      },
      queryParamsHandling: 'merge'
    }).then()

  }
  filter(value: string) {
    console.log(value)
    if(value){
      this.filterData = `firsName=${value}`
      this.router.navigate(['/customers'], {
        queryParams: {
          firsName: value
        },
        queryParamsHandling: 'merge'
      }).then()
    }

  }

  add() {
    this.modal.create({
      nzTitle: 'დამატება/რედაქტირება',
      nzContent: AddOrEditCustomersComponent,
      nzWidth: '750px',
      nzData: {},
      nzOnOk: () => {
        // this.customers$()
      }
    });
  }

}
