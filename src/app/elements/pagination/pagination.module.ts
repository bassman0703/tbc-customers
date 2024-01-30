import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
    declarations: [PaginationComponent],
    imports: [CommonModule, NzPaginationModule, NzTagModule],
    exports: [PaginationComponent],
})
export class PaginationModule {}
