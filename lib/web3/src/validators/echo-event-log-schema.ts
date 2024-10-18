import type { EvmAddress } from '@echo/model/types/evm-address'
import type { OfferState } from '@echo/model/types/offer/offer-state'
import { isIn } from '@echo/utils/fp/is-in'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { echoEventTypes } from '@echo/web3/constants/echo-event-types'
import type { EchoEvent } from '@echo/web3/types/echo-event'
import type { Log } from '@echo/web3/types/log'
import { trim } from '@echo/web3/utils/trim'
import { blockDataSchema } from '@echo/web3/validators/block-data-schema'
import { __, applySpec, filter, flatten, keys, map, path, pipe, prop, reject, toLower } from 'ramda'
import { array } from 'zod'

export const echoEventLogSchema = array(blockDataSchema)
  .nonempty()
  .transform((args) => {
    const topicHashes: HexString[] = keys(echoEventTypes)
    return pipe<[typeof args], EchoEvent[][], EchoEvent[]>(
      map(
        pipe(
          prop('logs'),
          filter<Log>(pipe(path(['topics', 0]), isIn(topicHashes))),
          map<Log, EchoEvent>(
            applySpec<EchoEvent>({
              transactionHash: prop('transactionHash'),
              offerId: pipe<[Log], HexString, HexString, EvmAddress>(
                path(['topics', 1]),
                trim<HexString>,
                toLower<HexString>
              ),
              type: pipe<[Log], keyof typeof echoEventTypes, OfferState>(
                path(['topics', 0]) as (log: Log) => keyof typeof echoEventTypes,
                // FIXME
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                prop(__, echoEventTypes)
              ),
              // In the case of a redeemed event, we need to check who's redeeming which is last part of the topic
              // It's unused otherwise
              from: pipe<[Log], Nullable<HexString>, Nullable<EvmAddress>>(
                path(['topics', 2]),
                unlessNil(pipe(trim<HexString>, toLower<HexString>))
              )
            })
          ),
          // just in case, because they should've been filtered out already
          reject<EchoEvent>(propIsNil('type'))
        )
      ),
      flatten
    )(args)
  })
