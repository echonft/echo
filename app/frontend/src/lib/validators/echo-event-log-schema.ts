import { echoEventTypeFromTopic } from '@echo/frontend/lib/helpers/webhook/echo-event-type-from-topic'
import type { EchoEvent } from '@echo/frontend/lib/types/echo-event/echo-event'
import { ECHO_EVENT_HASHES } from '@echo/frontend/lib/types/echo-event/echo-event-hashes'
import type { Log } from '@echo/frontend/lib/types/webhook/log'
import { blockDataSchema } from '@echo/frontend/lib/validators/block-data-schema'
import type { EvmAddress } from '@echo/model/types/evm-address'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { trim } from '@echo/web3/helpers/utils'
import { applySpec, filter, flatten, map, path, pipe, prop, toLower } from 'ramda'
import { array } from 'zod'

export const echoEventLogSchema = array(blockDataSchema)
  .nonempty()
  .transform((args) =>
    pipe<[typeof args], EchoEvent[][], EchoEvent[]>(
      map(
        pipe(
          prop('logs'),
          filter<Log>(pipe(nonNullableReturn(path(['topics', 0])), isIn(ECHO_EVENT_HASHES))),
          map(
            applySpec({
              transactionHash: prop('transactionHash'),
              offerId: pipe<[Log], HexString, HexString, EvmAddress>(
                nonNullableReturn(path(['topics', 1])),
                trim<HexString>,
                toLower<HexString>
              ),
              type: pipe(nonNullableReturn(path(['topics', 0])), echoEventTypeFromTopic),
              // In the case of a redeemed event, we need to check who's redeeming which is last part of the topic
              // It's unused otherwise
              from: pipe<[Log], Nullable<HexString>, Nullable<EvmAddress>>(
                path(['topics', 2]),
                unlessNil(pipe(trim<HexString>, toLower<HexString>))
              )
            })
          )
        )
      ),
      flatten
    )(args)
  )
