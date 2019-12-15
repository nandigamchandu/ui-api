import { FormikActions } from 'formik';
import { SubmitAction } from './common';
export interface SubmitResult<T extends {}> {
    readonly serverError: string | undefined;
    readonly onSubmit: SubmitAction<T>;
}
export declare function useSubmit<T extends {}>(asyncFn: (formValues: T) => Promise<T>, onSuccess: (values: T, actions: FormikActions<T>) => void, onFailure?: (err: any, actions: FormikActions<T>) => void): SubmitResult<T>;
export declare function useRedirect(): {
    onRedirect(path?: string): void;
};
export declare function useSubmitRedirect<T extends {}>(asyncFn: (formValues: T) => Promise<T>, redirectTo?: string): SubmitResult<T>;
export declare function useSubmitReset<T extends {}>(asyncFn: (formValues: T) => Promise<T>, noReset?: boolean): SubmitResult<T>;
//# sourceMappingURL=useSubmit.d.ts.map