import { intStringSchema } from '@echo/model/validators/int-string-schema'
import { describe, expect, it } from '@jest/globals'

describe('intStringSchema', () => {
  it('invalid', () => {
    expect(() => intStringSchema.parse(undefined)).toThrow()
    expect(() => intStringSchema.parse(null)).toThrow()
    expect(() => intStringSchema.parse('')).toThrow()
    expect(() => intStringSchema.parse('not a number')).toThrow()
    expect(() => intStringSchema.parse('0.3')).toThrow()
    expect(() => intStringSchema.parse('0.002.')).toThrow()
    expect(() => intStringSchema.parse('0.1.1')).toThrow()
  })
  it('valid', () => {
    expect(intStringSchema.parse('10')).toEqual(10)
    expect(intStringSchema.parse('-10')).toEqual(-10)
  })
})
