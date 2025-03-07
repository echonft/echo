import { embedSeparator } from '@echo/bot/helpers/embed/embed-separator'
import { describe, expect, it } from '@jest/globals'

describe('helpers - embed - embedSeparator', () => {
  it('should return an object with empty strings', () => {
    const result = embedSeparator()
    expect(result).toEqual({
      name: '\u200b',
      value: '\u200b',
      inline: false
    })
  })
})
