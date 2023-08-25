import { idRequestSchema } from '../../src/validators/id-request-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - idRequestSchema', () => {
  it('wrong id fails validation', () => {
    expect(() => idRequestSchema.parse({ id: '' })).toThrow()
    expect(() => idRequestSchema.parse({ id: undefined })).toThrow()
    expect(() => idRequestSchema.parse({ id: 0 })).toThrow()
  })
  it('valid id pass', () => {
    expect(idRequestSchema.parse({ id: '1' })).toStrictEqual({ id: '1' })
    expect(idRequestSchema.parse({ id: 'TeStId1234' })).toStrictEqual({ id: 'TeStId1234' })
  })
})
