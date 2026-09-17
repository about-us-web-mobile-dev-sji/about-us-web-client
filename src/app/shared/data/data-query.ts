export type SortDirection= 'asc'| 'desc';

export interface DataSort{
    field:string;
    direction:SortDirection;
}

export interface DataQuery<F extends object>{
    page:number;
    pageSize:number;
    filters:F;
    sort?: DataSort;
}