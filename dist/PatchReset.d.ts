import React from 'react';
import { SubmitAction } from './common';
export interface PatchResetComponentProps<T> {
    readonly initial?: T;
    readonly onSubmit: SubmitAction<T>;
}
export interface PatchResetProps<T, ID extends keyof T> {
    readonly id: T[ID];
    doGet(id: T[ID]): Promise<T>;
    onPatch(id: T[ID], values: Partial<T>): Promise<T>;
    readonly component: React.FC<PatchResetComponentProps<T>>;
}
export declare function PatchReset<T, ID extends keyof T>({ id, doGet, onPatch, component: Component, }: PatchResetProps<T, ID>): JSX.Element;
//# sourceMappingURL=PatchReset.d.ts.map