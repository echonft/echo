import type { OfferExecutedEvent } from '@echo/frontend/lib/types/echo-event/offer-executed-event'
import { OfferExecutedEventHash } from '@echo/frontend/lib/types/echo-event/offer-executed-event-hash'
import type { Log } from '@echo/frontend/lib/types/webhook/log'
import { blockDataSchema } from '@echo/frontend/lib/validators/block-data-schema'
import type { EvmAddress } from '@echo/model/types/evm-address'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { HexString } from '@echo/utils/types/hex-string'
import { trim } from '@echo/web3/helpers/utils'
import { applySpec, filter, flatten, map, path, pathEq, pipe, prop, toLower } from 'ramda'
import { array } from 'zod'

// TODO Right now this only take the offer executed event, should add more later
export const echoEventLogSchema = array(blockDataSchema)
  .nonempty()
  .transform((args) =>
    pipe<[typeof args], OfferExecutedEvent[][], OfferExecutedEvent[]>(
      map(
        pipe(
          prop('logs'),
          // Remove the data where topic is not OfferExecutedEventHash
          filter<Log>(pathEq(OfferExecutedEventHash, ['topics', 0])),
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
    )(args)
  )
