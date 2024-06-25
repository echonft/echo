import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { concat, converge, ifElse, inc, isNil, modify, pipe, prop, propEq } from 'ramda'

interface RecursiveFnArgs {
  slug: string
  index: number
}

async function rescursiveFn(args: RecursiveFnArgs): Promise<string> {
  const slug = ifElse<[RecursiveFnArgs], string, string>(
    propEq(0, 'index'),
    prop('slug'),
    converge<string, [(args: RecursiveFnArgs) => string, (args: RecursiveFnArgs) => string]>(concat<string, string>, [
      prop('slug'),
      pipe(prop('index'), (index: number) => `-${index}`)
    ])
  )(args)
  const snapshot = await getCollectionSnapshot(slug)
  if (isNil(snapshot)) {
    return slug
  }
  return pipe<[RecursiveFnArgs], RecursiveFnArgs, Promise<string>>(modify('index', inc), rescursiveFn)(args)
}

export async function generateUniqueCollectionSlug(slug: string) {
  return await rescursiveFn({ slug, index: 0 })
}
