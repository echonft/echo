import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import type { Log } from '@echo/frontend/lib/types/webhook/log'
import { blockDataSchema } from '@echo/frontend/lib/validators/block-data-schema'
import type { EvmAddress } from '@echo/model/types/evm-address'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { HexString } from '@echo/utils/types/hex-string'
import { chainSchema } from '@echo/utils/validators/chain-schema'
import { hexToNumber, trim } from '@echo/web3/helpers/utils'
import { always, applySpec, equals, F, filter, flatten, ifElse, length, map, path, pipe, prop, toLower } from 'ramda'
import { array, object } from 'zod'

export const transferEventLogSchema = object({
  data: array(blockDataSchema).nonempty(),
  chain: chainSchema
}).transform((args) =>
  pipe<[typeof args.data], NftTransfer[][], NftTransfer[]>(
    map(
      pipe(
        prop('logs'),
        // Remove the data where topics don't have 4 elements (not an NFT transfer)
        filter(pipe(prop('topics'), ifElse(isNilOrEmpty, F, pipe(length, equals(4))))),
        map(
          applySpec({
            contract: {
              address: pipe<[Log], HexString, EvmAddress>(prop('address'), toLower<HexString>),
              chain: always(args.chain)
            },
            from: {
              address: pipe<[Log], HexString, HexString, EvmAddress>(
                nonNullableReturn(path(['topics', 1])),
                trim<HexString>,
                toLower<HexString>
              ),
              chain: always(args.chain)
            },
            to: {
              address: pipe<[Log], HexString, HexString, EvmAddress>(
                nonNullableReturn(path(['topics', 2])),
                trim<HexString>,
                toLower<HexString>
              ),
              chain: always(args.chain)
            },
            tokenId: pipe<[Log], HexString, number>(nonNullableReturn(path(['topics', 3])), hexToNumber)
          })
        )
      )
    ),
    flatten
  )(args.data)
)
