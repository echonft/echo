import { slugSchema, withSlugSchema } from '@echo/model/validators/slug-schema'
import { describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('slugSchema', () => {
  it('invalid', () => {
    const values = [undefined, null, '', 10]
    forEach((value) => {
      expect(() => slugSchema.parse(value)).toThrow()
      expect(() => withSlugSchema.parse({ slug: value })).toThrow()
    }, values)
  })
  it('valid', () => {
    const values = [
      { slug: 'my-slug', parsed: 'my-slug' },
      {
        slug: 'my slug_with+UPPERCASE',
        parsed: 'my-slug_withuppercase'
      }
    ]
    forEach((value) => {
      expect(slugSchema.parse(value.slug)).toStrictEqual(value.parsed)
      expect(withSlugSchema.parse({ slug: value.slug })).toStrictEqual({ slug: value.parsed })
    }, values)
  })
})
