export const isValidId = (id: string): boolean => {
    return !!id && id.length === 36;
}