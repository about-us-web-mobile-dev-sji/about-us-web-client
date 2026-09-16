export type TableColumnType =
    | 'text'
    | 'number'
    | 'date'
    | 'boolean'
    | 'badge'

export interface TableColumn<T> {
    field?: keyof T;
    header:string;
    type?:TableColumnType;
    sortable?:boolean;
    width?:string;
    
}