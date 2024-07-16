import type { Slug } from '@echo/model/types/slug'

export type WithSlugType<T> = T & Record<'slug', Slug>
