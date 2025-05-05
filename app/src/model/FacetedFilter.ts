export interface FacetedFilter {
    columnName:string,
    title: string,
    options: {
        label: string;
        value: string;
        // This should be `Component` after @lucide/svelte updates types
        icon?: any;
    }[]
}