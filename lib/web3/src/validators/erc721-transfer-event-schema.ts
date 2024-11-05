import { addressSchema } from '@echo/model/validators/address-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { NftTransferEvent } from '@echo/web3/types/nft-transfer-event'
import { eventBlockDataSchema } from '@echo/web3/validators/event-block-data-schema'
import { hexNumberSchema } from '@echo/web3/validators/hex-number-schema'
import { topicSchema } from '@echo/web3/validators/topic-schema'
import { applySpec, equals, F, filter, flatten, ifElse, length, map, path, pipe, prop } from 'ramda'
import { object, tuple, unknown } from 'zod'

const erc721TransferEventLogSchema = object({
  address: addressSchema,
  topics: tuple([unknown(), topicSchema.pipe(addressSchema), topicSchema.pipe(addressSchema), hexNumberSchema]),
  transactionHash: hexStringSchema
})
  .array()
  .transform(
    map(
      applySpec<NftTransferEvent>({
        contract: prop('address'),
        from: path(['topics', 1]),
        to: path(['topics', 2]),
        tokenId: path(['topics', 3])
      })
    )
  )

export const erc721TransferEventSchema = eventBlockDataSchema
  .array()
  .nonempty()
  .transform(
    // Remove the data where topics don't have 4 elements (not an NFT transfer)
    map(pipe(prop('logs'), filter(pipe(prop('topics'), ifElse(isNilOrEmpty, F, pipe(length, equals(4)))))))
  )
  .transform((args) => {
    return pipe((log) => erc721TransferEventLogSchema.array().parse(log), flatten)(args)
  })
