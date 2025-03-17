function compareCaseInsensitive(a: any, b: any, property: string) {
    return a[property].localeCompare(b[property], undefined, { sensitivity: 'base' })
}

/**
 * Function used to compare 2 objects by the property 'name'. Useful for sorting most ISC objects
 */
export const compareByName = (a: any, b: any) => compareCaseInsensitive(a, b, "name");

/**
 * Function used to compare 2 objects by the property 'priority'. Useful for sorting QuickPickItem or TreeItem
 */
export const compareByLabel = (a: any, b: any) => compareCaseInsensitive(a, b, "label");


export const compare = (a: string | undefined | null, b: string | undefined | null) => {
    if (a === undefined || a === null) { return 1 };
    if (b === undefined || b === null) { return -1 };
    return a.localeCompare(b);
}