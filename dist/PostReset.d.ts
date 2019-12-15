import React from 'react';
import { SubmitAction } from './common';
export interface PostResetProps<T> {
    readonly component: React.FC<{
        readonly onSubmit: SubmitAction<T>;
    }>;
    onPost(values: T): Promise<T>;
}
export declare function PostReset<T>({ onPost, component: Component, }: PostResetProps<T>): JSX.Element;
//# sourceMappingURL=PostReset.d.ts.map