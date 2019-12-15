export interface DelResult {
    readonly serverError: string | undefined;
    onClick(): Promise<void>;
}
export declare function useDel(asyncFn: () => Promise<void>, onSuccess: () => void, onFailure?: (err: any) => void): DelResult;
//# sourceMappingURL=useDel.d.ts.map