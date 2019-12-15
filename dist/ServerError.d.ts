import React from 'react';
import * as t from 'technoidentity-utils';
declare const SingleError: t.StringC;
declare const Errors: t.ReadonlyArrayC<t.StringC>;
interface ValidationErrors extends Record<string, t.TypeOf<typeof SingleError> | t.TypeOf<typeof Errors> | ValidationErrors> {
}
declare const ValidationErrors: t.Type<ValidationErrors>;
declare const ServerErrors: t.UnionC<[t.StringC, t.StringC, t.ReadonlyArrayC<t.StringC>, t.Type<ValidationErrors, ValidationErrors, unknown>]>;
declare type ServerErrors = t.TypeOf<typeof ServerErrors>;
export interface ServerErrorViewProps {
    readonly error?: ServerErrors;
}
export declare const ServerError: React.FC<ServerErrorViewProps>;
export {};
//# sourceMappingURL=ServerError.d.ts.map