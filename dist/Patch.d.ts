import React from 'react';
import { SubmitAction } from './common';
export interface PatchComponentProps<T> {
    readonly initial?: T;
    readonly onSubmit: SubmitAction<T>;
}
export interface PatchProps<T, ID extends keyof T> {
    readonly redirectTo?: string;
    readonly id: T[ID];
    doGet(id: T[ID]): Promise<T>;
    onPatch(id: T[ID], values: Partial<T>): Promise<T>;
    readonly component: React.FC<PatchComponentProps<T>>;
}
export declare function Patch<T, ID extends keyof T>({ id, redirectTo, doGet, onPatch, component: Component, }: PatchProps<T, ID>): JSX.Element;
//# sourceMappingURL=Patch.d.ts.map