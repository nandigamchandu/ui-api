export declare type AsyncResult<T> = {
    refresh(): void;
} & ({
    readonly state: 'none' | 'loading';
} | {
    readonly state: 'success';
    readonly data: T;
} | {
    readonly state: 'failure';
    readonly error: Error;
});
export declare function useGet<T extends {}, P extends any[]>(asyncFn: (...params: P) => Promise<T>, ...deps: P): AsyncResult<T>;
export declare function useGet<T extends {}>(asyncFn: () => Promise<T>): AsyncResult<T>;
//# sourceMappingURL=useGet.d.ts.map