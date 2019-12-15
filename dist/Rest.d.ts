import { API } from 'devfractal-api';
import React from 'react';
import { SubmitAction } from './common';
export interface RestContext {
    readonly redirectTo: string;
    readonly api: API<any, any, any>;
}
export interface RestProps extends RestContext {
    readonly children: React.ReactNode;
}
export declare function Rest({ redirectTo, api, children }: RestProps): JSX.Element;
export declare function useRest(): RestContext;
export interface RestGetComponentProps<T> {
    readonly data: ReadonlyArray<T>;
}
export interface RestGetProps<T> {
    readonly path: string;
    readonly component: React.FC<RestGetComponentProps<T>>;
}
export declare function RestGet<T>({ path, component: Component, }: RestGetProps<T>): JSX.Element;
export interface RestPostProps<T> {
    readonly path: string;
    readonly component: React.FC<{
        readonly onSubmit: SubmitAction<T>;
    }>;
}
export declare function RestPost<T>({ path, component: Component, }: RestPostProps<T>): JSX.Element;
export interface RestPutComponentProps<T> {
    readonly initial?: T;
    readonly onSubmit: SubmitAction<T>;
}
export interface RestPutProps<T> {
    readonly path?: string;
    readonly component: React.FC<RestPutComponentProps<T>>;
}
export declare function RestPut<T>({ path, component: Component, }: RestPutProps<T>): JSX.Element;
//# sourceMappingURL=Rest.d.ts.map