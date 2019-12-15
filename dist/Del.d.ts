import React from 'react';
export interface DelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onDel(): Promise<void>;
    onSuccess(): void;
}
export declare function Del({ onDel, onSuccess, children, ...props }: DelProps): JSX.Element;
//# sourceMappingURL=Del.d.ts.map