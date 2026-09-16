
export interface TableColumn<T>{
    field?: keyof T;
    header:string;
    type?:'text'|'number'|'boolean'|'badge'|'date';
    sortable?:boolean;
    formatter?: (value:unknown, row:T)=>string;
    valueGetter?: (row:T) => unknown;
    width?:string;

}

export interface TableFilterOption{
    label:string;
    value:string | number | boolean;
}

export interface TableFilter{
    field:string;
    label:string;
    type:'select'| 'text' | 'date';
    options?:TableFilterOption[];
}


export interface TableAction<T>{
    id:string;
    label:string;
    icon?:string;

    severity?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warn'
        | 'danger';
    visible?: (row:T) =>boolean;
    disabled?: (row:T) => boolean;
}

export interface TableActionEvent<T>{
    action:string;
    row:T;
}

export interface TableFilterChange{
    field:string;
    value:string;
}

export interface TablePagination{
    page:number;
    pageSize:number;
    total:number;
}

export interface TablePageEvent {
    page:number;
    pageSize:number;
}