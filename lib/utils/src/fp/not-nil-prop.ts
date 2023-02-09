import { both, has, isNil, not, pipe, prop } from 'rambda'

export const notNilProp: (propToFind: string) => <T>(obj: T) => boolean = (propToFind: string) =>
  both(has(propToFind), pipe(prop(propToFind), isNil, not))
