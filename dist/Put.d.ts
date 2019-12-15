import React from 'react';
import { SubmitAction } from './common';
export interface PutComponentProps<T> {
    readonly initial?: T;
    readonly onSubmit: SubmitAction<T>;
}
export interface PutProps<T, ID extends keyof T> {
    readonly redirectTo?: string;
    readonly id: T[ID];
    doGet(id: T[ID]): Promise<T>;
    onPut(id: T[ID], values: T): Promise<T>;
    readonly component: React.FC<PutComponentProps<T>>;
}
export declare function Put<T, ID extends keyof T>({ id, redirectTo, doGet, onPut, component: Component, }: PutProps<T, ID>): JSX.Element;
//# sourceMappingURL=Put.d.ts.map