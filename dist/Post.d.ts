import React from 'react';
import { SubmitAction } from './common';
export interface PostComponentProps<T> {
    readonly onSubmit: SubmitAction<T>;
}
export interface PostProps<T> {
    readonly redirectTo?: string;
    readonly component: React.FC<PostComponentProps<T>>;
    onPost(values: T): Promise<T>;
}
export declare function Post<T>({ redirectTo, onPost, component: Component, }: PostProps<T>): JSX.Element;
//# sourceMappingURL=Post.d.ts.map