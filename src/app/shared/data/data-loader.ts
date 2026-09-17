import { DataQuery } from "./data-query";
import { Page } from "./page";

export type DataLoader<T, F extends object>=(
    query:DataQuery<F>
)=> Promise<Page<T>>;