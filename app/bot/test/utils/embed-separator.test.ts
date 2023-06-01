import { describe, expect, it } from '@jest/globals'
import { embedSeparator } from '../../src/utils/embed/embed-separator'

describe('utils - embed - embedSeparator', () => {
  it('should return an object with empty strings', () => {
    const result = embedSeparator()
    expect(result).toEqual({
      name: '\u200b',
      value: '\u200b',
      inline: false
    })
  })
})
