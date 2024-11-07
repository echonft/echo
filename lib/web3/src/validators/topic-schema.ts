import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { equals } from 'ramda'
import { trim } from 'viem'

const addressZeroTopic = '0x0000000000000000000000000000000000000000000000000000000000000000'
const addressZero = '0x0000000000000000000000000000000000000000'

export const topicSchema = hexStringSchema.transform((val) => {
  // We need to handle the 0 address topic because the trim method doesn't return the proper value for it
  if (equals(val, addressZeroTopic)) {
    return addressZero
  } else {
    return trim(val)
  }
})
