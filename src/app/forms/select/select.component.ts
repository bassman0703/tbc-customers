import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzSelectModeType} from 'ng-zorro-antd/select';
import {DefaultValueAccessor, InputBase} from "../../common";

let nextUniqueId = 0;

@Component({
    selector: 'tb-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [DefaultValueAccessor],
})
export class SelectComponent extends InputBase {
    @Input() label: string | undefined;
    @Input() placeholder = '---';
    @Input() data: any[] | null | undefined = null;
    @Input() valueMember: string | undefined;
    @Input() displayMember: string | undefined;
    @Input() withTooltip: boolean = false;
    @Input() mode: NzSelectModeType = 'default';
    @Input() maxMultipleCount: number | null = null;
    @Input() maxTagCount: number = 2;
    @Input() readonly: boolean = false;
    @Input() nzTooltipTitle: string | undefined;
    @Input() nzAllowClear = true;
    @Input() nzServerSearch = false;

    private uniqueId = `ref-select-${++nextUniqueId}`;
    @Input() id: string = this.uniqueId;

    @Output() selected: EventEmitter<any> = new EventEmitter<any>();
    @Output() cleared: EventEmitter<any> = new EventEmitter<any>();
    @Output() openChanged: EventEmitter<any> = new EventEmitter<any>();

    public get inputId(): string {
        return `${this.id || this.uniqueId}`;
    }

    public toDisplay(item: any) {
        return item && (!!this.displayMember ? item[this.displayMember] : item);
    }

    public toValue(item: any) {
        return item && (!!this.valueMember ? item[this.valueMember] : item);
    }

    isDisabled(item: any) {
        return item['disabled'];
    }

    onChange($event: any) {
        this.updateAndNotify($event);
        this.selected.emit($event);
    }

    clear($event: any) {
        this.cleared.emit($event);
        this.updateAndNotify(null);
        this.selected.emit(null);
    }

    openChange($event: any) {
        this.openChanged.emit(true)
    }
}
