import React from 'react';
export interface GetProps<T extends {}, P extends any[]> {
    readonly deps?: P | [];
    readonly component?: React.FC<{
        readonly data: T;
        fetchAgain?(): void;
    }>;
    asyncFn(...params: P): Promise<T>;
    children?(data: T, fetchAgain: () => void): JSX.Element;
}
export declare function Get<T extends {}, P extends any[]>({ asyncFn, deps, component: Component, children, }: GetProps<T, P>): JSX.Element;
//# sourceMappingURL=Get.d.ts.map