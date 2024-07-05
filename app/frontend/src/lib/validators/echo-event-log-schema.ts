import { ECHO_EVENT_TYPES } from '@echo/frontend/lib/constants/echo-event-types'
import type { EchoEvent } from '@echo/frontend/lib/types/webhook/echo-event'
import type { Log } from '@echo/frontend/lib/types/webhook/log'
import { blockDataSchema } from '@echo/frontend/lib/validators/block-data-schema'
import type { EvmAddress } from '@echo/model/types/evm-address'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { trim } from '@echo/web3/helpers/utils'
import { __, applySpec, filter, flatten, keys, map, path, pipe, prop, reject, toLower } from 'ramda'
import { array } from 'zod'

export const echoEventLogSchema = array(blockDataSchema)
  .nonempty()
  .transform((args) => {
    const topicHashes: HexString[] = keys(ECHO_EVENT_TYPES)
    return pipe<[typeof args], EchoEvent[][], EchoEvent[]>(
      map(
        pipe(
          prop('logs'),
          filter<Log>(pipe(nonNullableReturn(path<HexString>(['topics', 0])), isIn(topicHashes))),
          map<Log, EchoEvent>(
            applySpec<EchoEvent>({
              transactionHash: prop('transactionHash'),
              offerId: pipe<[Log], HexString, HexString, EvmAddress>(
                nonNullableReturn(path(['topics', 1])),
                trim<HexString>,
                toLower<HexString>
              ),
              type: pipe(nonNullableReturn(path(['topics', 0])), prop(__, ECHO_EVENT_TYPES)),
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
