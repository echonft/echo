import { either, isEmpty, isNil } from 'ramda'

// We need to disable the typing checks here because we use a type guard to let typescript know the value
// is defined. Our typing is wrong because isEmpty returns only a boolean, but in our case, when using
// that function, we only want to know that the object exists after the call.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const isNilOrEmpty: (value: unknown) => value is null | undefined = either(isNil, isEmpty)
