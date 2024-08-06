import type { Log } from '@echo/frontend/lib/types/webhook/log'
import type { NftTransfer } from '@echo/frontend/lib/types/webhook/nft-transfer'
import { blockDataSchema } from '@echo/frontend/lib/validators/block-data-schema'
import type { EvmAddress } from '@echo/model/types/evm-address'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { hexToNumber } from '@echo/web3/utils/hex-to-number'
import { trim } from '@echo/web3/utils/trim'
import { always, applySpec, equals, F, filter, flatten, ifElse, length, map, path, pipe, prop, toLower } from 'ramda'
import { array } from 'zod'

export function transferEventLogSchema(chain: ChainName) {
  const schema = array(blockDataSchema).nonempty()
  function transform(chain: ChainName) {
    return function (response: typeof schema._output) {
      return pipe<[typeof schema._output], NftTransfer[][], NftTransfer[]>(
        map(
          pipe(
            prop('logs'),
            // Remove the data where topics don't have 4 elements (not an NFT transfer)
            filter(pipe(prop('topics'), ifElse(isNilOrEmpty, F, pipe(length, equals(4))))),
            map(
              applySpec({
                contract: {
                  address: pipe<[Log], HexString, EvmAddress>(prop('address'), toLower<HexString>),
                  chain: always(chain)
                },
                from: {
                  address: pipe<[Log], HexString, HexString, EvmAddress>(
                    nonNullableReturn(path(['topics', 1])),
                    trim<HexString>,
                    toLower<HexString>
                  ),
                  chain: always(chain)
                },
                to: {
                  address: pipe<[Log], HexString, HexString, EvmAddress>(
                    nonNullableReturn(path(['topics', 2])),
                    trim<HexString>,
                    toLower<HexString>
                  ),
                  chain: always(chain)
                },
                tokenId: pipe<[Log], HexString, number>(nonNullableReturn(path(['topics', 3])), hexToNumber)
              })
            )
          )
        ),
        flatten
      )(response)
    }
  }
  return schema.transform(transform(chain))
}
