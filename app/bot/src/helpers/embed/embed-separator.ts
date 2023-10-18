import { type APIEmbedField } from 'discord.js'

/**
 * Creates an empty APIEmbedField object to separate multiple embed fields.
 * This is to allow using `inline` true with multiline fields.
 */
export function embedSeparator(): APIEmbedField {
  return {
    name: '\u200b',
    value: '\u200b',
    inline: false
  }
}
