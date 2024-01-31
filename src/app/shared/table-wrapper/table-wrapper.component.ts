import {Component, Input, TemplateRef} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'tb-table-wrapper',
  standalone: true,
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
  imports: [
    NgIf
  ]
})
export class TableWrapperComponent {
  @Input('header')
  public filterTemplate: TemplateRef<unknown> | null = null;

  @Input('actions')
  public actionsTemplate: TemplateRef<unknown> | null = null;
  @Input() noHeader = false;
}
