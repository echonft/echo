import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import type { Slug } from '@echo/model/types/slug'
import { concat, converge, ifElse, inc, isNil, modify, pipe, prop, propEq } from 'ramda'

interface RecursiveFnArgs {
  slug: Slug
  index: number
}

async function rescursiveFn(args: RecursiveFnArgs): Promise<Slug> {
  const slug = ifElse<[RecursiveFnArgs], Slug, Slug>(
    propEq(0, 'index'),
    prop('slug'),
    converge<Slug, [(args: RecursiveFnArgs) => Slug, (args: RecursiveFnArgs) => Slug]>(concat<Slug, Slug>, [
      prop('slug'),
      pipe(prop('index'), (index: number) => `-${index}` as Slug)
    ])
  )(args)
  const snapshot = await getCollectionSnapshot(slug)
  if (isNil(snapshot)) {
    return slug
  }
  return pipe<[RecursiveFnArgs], RecursiveFnArgs, Promise<Slug>>(modify('index', inc), rescursiveFn)(args)
}

export async function generateUniqueCollectionSlug(slug: Slug) {
  return await rescursiveFn({ slug, index: 0 })
}
