import React from 'react';
import { SubmitAction } from './common';
export interface PutResetComponentProps<T> {
    readonly initial?: T;
    readonly onSubmit: SubmitAction<T>;
}
export interface PutResetProps<T, ID extends keyof T> {
    readonly id: T[ID];
    doGet(id: T[ID]): Promise<T>;
    onPut(id: T[ID], values: T): Promise<T>;
    readonly component: React.FC<PutResetComponentProps<T>>;
}
export declare function PutReset<T, ID extends keyof T>({ id, doGet, onPut, component: Component, }: PutResetProps<T, ID>): JSX.Element;
//# sourceMappingURL=PutReset.d.ts.map