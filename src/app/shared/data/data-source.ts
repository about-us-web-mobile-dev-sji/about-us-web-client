import { computed, signal } from "@angular/core";
import { DataQuery, DataSort } from "./data-query";

import { DataLoader } from "./data-loader";

export interface DataSourceOption<F extends object> {
    initialFilters: F;
    initialPageSize?: number;
}

export class DataSource<T, F extends object> {

    readonly data = signal<T[]>([]);
    readonly loading = signal(false);
    readonly error = signal<unknown>(null);
    readonly total = signal(0);

    readonly page = signal(1);
    readonly pageSize = signal(10);
    readonly filters;
    readonly sort = signal<DataSort | undefined>(undefined)

    readonly totalPages = computed(() => {
        const size = this.pageSize();
        if (size <= 0) {
            return 1;
        }
        return Math.max(1, Math.ceil(this.total() / size))
    });

    readonly isEmpty = computed(
        () => !this.loading && this.data().length === 0
    )

    readonly hasData = computed(
        () => this.data().length > 0
    );

    readonly query = computed<DataQuery<F>>(
        () => ({
            page: this.page(),
            pageSize: this.pageSize(),
            filters: this.filters(),
            sort: this.sort()
        })
    )

    constructor(
        private readonly loader: DataLoader<T, F>,
        options: DataSourceOption<F>
    ) {
        this.filters = signal<F>(options.initialFilters);
        this.pageSize.set(
            options.initialPageSize ?? 10
        )
    }

    async load(): Promise<void> {
        this.loading.set(true);
        this.error.set(null);
        try {
            const result = await this.loader(this.query());
            this.data.set(result.items);
            this.total.set(result.total)
        } catch (error: unknown) {
            this.error.set(error);
        } finally {
            this.loading.set(false);
        }
    }

    async setPage(page: number): Promise<void> {
        if (page < 1) { return; }
        if (this.total() > 0 && page > this.totalPages()) { return; }
        if (page === this.page()) { return; }
        this.page.set(page);
        await this.load();
    }

    async setPageSize(pageSize: number): Promise<void> {
        if (pageSize <= 0) { return; }
        if (pageSize === this.pageSize()) { return; }
        this.pageSize.set(pageSize);
        this.page.set(1);
        await this.load();
    }

    async setFilters(filters: F): Promise<void> {
        this.filters.set(filters);
        this.page.set(1);
        await this.load();
    }

    async patchFilters(patch: Partial<F>): Promise<void> {
        this.filters.update(current => ({
            ...current,
            ...patch
        }));
        this.page.set(1);
        await this.load();
    }

    async setSort(sort?: DataSort): Promise<void> {
        this.sort.set(sort);
        this.page.set(1);
        await this.load();
    }

    async refresh(): Promise<void> {
        await this.load();
    }

    clearError(): void {
        this.error.set(null);
    }

    updateItem(predicate: (item: T) => boolean,
        updatedIem: T): void {
        this.data.update(items => items.map(item => predicate(item) ? updatedIem : item))
    }

    removeItem(
        predicate: (item: T) => boolean
    ): void {
        this.data.update(items => items.filter(item => !predicate(item)))
    }

    prependItem(item:T):void{
        this.data.update(items=>[
            item,
            ...items
        ]);
        this.total.update(total => total+1);
    }


}