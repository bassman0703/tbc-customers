import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface WaPagination {
    page: number;
    pageSize: number;
}

@Component({
    selector: 'tb-pagination',
    template: ` <nz-pagination
            [(nzPageSize)]="pageSize"
            [(nzPageIndex)]="page"
            [nzTotal]="total"
            [nzSize]="'small'"
            (nzPageSizeChange)="pageSizeChange($event)"
            (nzPageIndexChange)="pageChange($event)"
            nzResponsive
            [nzHideOnSinglePage]="false"
        ></nz-pagination>
        <ng-template #totalTemplate let-total
            >სულ:
            <nz-tag>{{ total }}</nz-tag>
        </ng-template>`,
})
export class PaginationComponent {
    @Input() pageSize: number = 10;
    @Input() page: number = 1;
    @Input() total: number = 1;

    @Output() paginationChange: EventEmitter<WaPagination> = new EventEmitter<WaPagination>();

    pageSizeChange(pageSize: number) {
        this.paginationChange.emit({
            page: this.page,
            pageSize,
        });
    }

    pageChange(page: number) {
        this.paginationChange.emit({
            page,
            pageSize: this.pageSize,
        });
    }
}
