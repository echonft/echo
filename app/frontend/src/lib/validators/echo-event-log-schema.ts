import type { OfferExecutedEvent } from '@echo/frontend/lib/types/echo-event/offer-executed-event'
import { OfferExecutedEventHash } from '@echo/frontend/lib/types/echo-event/offer-executed-event-hash'
import type { Log } from '@echo/frontend/lib/types/webhook/log'
import { blockDataSchema } from '@echo/frontend/lib/validators/block-data-schema'
import type { EvmAddress } from '@echo/model/types/evm-address'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import { trim } from '@echo/web3/helpers/utils'
import { applySpec, equals, F, filter, flatten, ifElse, map, path, pipe, prop, toLower } from 'ramda'
import { array, object } from 'zod'

// TODO Right now this only take the offer executed event, should add more later
export const echoEventLogSchema = object({
  data: array(blockDataSchema).nonempty()
}).transform((args) =>
  pipe<[typeof args.data], OfferExecutedEvent[][], OfferExecutedEvent[]>(
    map(
      pipe(
        prop('logs'),
        // Remove the data where topic is not OfferCreatedHash
        filter(
          ifElse(
            pathIsNil(['topics', 0]),
            F,
            pipe(nonNullableReturn(path(['topics', 0])), equals(OfferExecutedEventHash))
          )
        ),
        map(
          applySpec({
            transactionHash: prop('transactionHash'),
            offerId: pipe<[Log], HexString, HexString, EvmAddress>(
              nonNullableReturn(path(['topics', 1])),
              trim<HexString>,
              toLower<HexString>
            )
          })
        )
      )
    ),
    flatten
  )(args.data)
)
