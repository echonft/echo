import type { Chain } from '@echo/utils/constants/chain'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import type { NftTransferEvent } from '@echo/web3/types/nft-transfer-event'
import { blockDataSchema } from '@echo/web3/validators/block-data-schema'
import { hexNumberSchema } from '@echo/web3/validators/hex-number-schema'
import { topicSchema } from '@echo/web3/validators/topic-schema'
import { always, applySpec, equals, F, filter, flatten, ifElse, length, map, path, pipe, prop } from 'ramda'
import { object, tuple, unknown } from 'zod'

function erc721TransferEventLogSchema(chain: Chain) {
  return object({
    address: evmAddressSchema,
    topics: tuple([unknown(), topicSchema.pipe(evmAddressSchema), topicSchema.pipe(evmAddressSchema), hexNumberSchema]),
    transactionHash: hexStringSchema
  })
    .array()
    .transform(
      map(
        applySpec<NftTransferEvent>({
          contract: {
            address: prop('address'),
            chain: always(chain)
          },
          from: {
            address: path(['topics', 1]),
            chain: always(chain)
          },
          to: {
            address: path(['topics', 2]),
            chain: always(chain)
          },
          tokenId: path(['topics', 3])
        })
      )
    )
}

export function erc721TransferEventSchemaBuilder(chain: Chain) {
  return blockDataSchema
    .array()
    .nonempty()
    .transform(
      // Remove the data where topics don't have 4 elements (not an NFT transfer)
      map(pipe(prop('logs'), filter(pipe(prop('topics'), ifElse(isNilOrEmpty, F, pipe(length, equals(4)))))))
    )
    .transform((args) => {
      return pipe((log) => erc721TransferEventLogSchema(chain).array().parse(log), flatten)(args)
    })
}
