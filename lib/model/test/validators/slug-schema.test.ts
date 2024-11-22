import { slugSchema, withSlugSchema } from '@echo/model/validators/slug-schema'
import { describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('slugSchema', () => {
  it('invalid', () => {
    const values = [undefined, null, '', 10, 'slug with space', 'slug-with-UPPERCASE']
    forEach((value) => {
      expect(() => slugSchema.parse(value)).toThrow()
      expect(() => withSlugSchema.parse({ slug: value })).toThrow()
    }, values)
  })
  it('valid', () => {
    const values = { slug: 'my-slug', parsed: 'my-slug' }
    expect(slugSchema.parse(values.slug)).toStrictEqual(values.parsed)
    expect(withSlugSchema.parse({ slug: values.slug })).toStrictEqual({ slug: values.parsed })
  })
})
