import {Component, inject} from "@angular/core";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzTheadComponent,
    NzThMeasureDirective, NzTrDirective
} from "ng-zorro-antd/table";
import {PaginationModule} from "../../elements";
import {TableWrapperComponent} from "../../shared/table-wrapper/table-wrapper.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";
import {map, switchMap, tap} from "rxjs";
import {pageOptions} from "../../models";
import {AccountService} from "../../services/account.service";
import {AddOrEditAccountsComponent} from "./add-or-edit-accounts/add-or-edit-accounts.component";

@Component({
    selector: 'app-accounts',
    standalone: true,
    templateUrl: 'accounts.component.html',
  imports: [
    AsyncPipe,
    HeaderComponent,
    NgForOf,
    NgIf,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    PaginationModule,
    TableWrapperComponent,
    JsonPipe
  ],
    styleUrl: 'accounts.component.scss'
})
export class AccountsComponent {
  accountService = inject(AccountService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  page = 1
  pageSize = 10
  total = 0
  constructor(
    private modal: NzModalService
  ) {
  }

  accounts$ = this.route.queryParams.pipe(
    map( (route) => {
      this.page = route['page'];
      this.pageSize = route['pageSize']
      return {
        page: this.page,
        pageSize: this.pageSize
      }
    }),
    switchMap((params) => {
      return this.accountService.getAccounts(pageOptions(params.page, params.pageSize)).pipe(
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
    this.router.navigate(['/accounts'], {
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
      nzContent: AddOrEditAccountsComponent,
      nzWidth: '750px',
      nzData: {
      },
      nzOnOk: () => {
      }
    });
  }
}
