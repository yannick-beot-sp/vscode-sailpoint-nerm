export const compare = (a: string | undefined | null, b: string | undefined | null) => {
    if (a === undefined || a === null) { return 1 };
    if (b === undefined || b === null) { return -1 };
    return a.localeCompare(b);
}