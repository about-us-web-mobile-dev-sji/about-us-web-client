import { Component, input, output } from '@angular/core';
import { TableFilter,TableColumn,TableAction,TableFilterOption,TableActionEvent ,TableFilterChange, TablePagination, TablePageEvent} from '../table-component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select'; // Remplacer par 'DropdownModule' de 'primeng/dropdown' si version < 18
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';
@Component({
  imports: [GenericDataTable, ButtonModule,SelectModule,IconFieldModule,InputIconModule,InputTextModule,TableModule,DatePipe],
  selector: 'app-generic-data-table',
  styleUrl: './generic-data-table.css',
  templateUrl: './generic-data-table.html',
})
export class GenericDataTable<T extends object> {
  readonly data = input.required<T[]>();

 
  readonly columns = input.required<TableColumn<T>[]>();
  readonly filters = input<TableFilter[]>([]);
  readonly actions = input<TableAction<T>[]>([]);

  
  readonly loading = input(false);
  readonly total = input(0);
  readonly page = input(1);
  readonly pageSize = input(10);

  
  readonly searchable = input(false);
  readonly searchPlaceholder = input('Rechercher...');

  
  readonly searchChange = output<string>();
  readonly filterChange = output<TableFilterChange>();
  readonly action = output<TableActionEvent<T>>();

  readonly pagination = input<TablePagination>();

readonly pageChange = output<TablePageEvent>();

  getValue(row: T, column: TableColumn<T>): unknown {
    if (column.valueGetter) {
      return column.valueGetter(row);
    }

    if (column.field) {
      return row[column.field];
    }

    return null;
  }

  executeAction(action: TableAction<T>, row: T): void {
    this.action.emit({
      action: action.id,
      row
    });
  }
}
