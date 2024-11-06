import { eqAddress } from '@echo/model/helpers/eq-address'
import type { HexString } from '@echo/model/types/hex-string'
import { addressSchema } from '@echo/model/validators/address-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { propEqWith } from '@echo/utils/helpers/prop-eq-with'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { EchoEventTopic } from '@echo/web3/constants/echo-event-topic'
import { EchoEventType } from '@echo/web3/constants/echo-event-type'
import type { EchoEvent } from '@echo/web3/types/echo-event'
import type { EventBlockData } from '@echo/web3/types/event-block-data'
import type { EventLog } from '@echo/web3/types/event-log'
import { eventBlockDataSchema } from '@echo/web3/validators/event-block-data-schema'
import { topicSchema } from '@echo/web3/validators/topic-schema'
import { applySpec, filter, flatten, isEmpty, map, path, pipe, prop, reject, toLower } from 'ramda'
import { nativeEnum, object, tuple } from 'zod'

function echoEventTopicToType(topic: EchoEventTopic): EchoEventType {
  switch (topic) {
    case EchoEventTopic.OfferAccepted:
      return EchoEventType.OfferAccepted
    case EchoEventTopic.OfferCancelled:
      return EchoEventType.OfferCancelled
    case EchoEventTopic.OfferCreated:
      return EchoEventType.OfferCreated
    case EchoEventTopic.OfferExecuted:
      return EchoEventType.OfferExecuted
    case EchoEventTopic.OfferRedeemed:
      return EchoEventType.OfferRedeemed
  }
}

export const echoEventSchema = object({
  address: addressSchema,
  topics: tuple([nativeEnum(EchoEventTopic).transform(echoEventTopicToType), topicSchema]).rest(
    topicSchema.pipe(addressSchema).optional()
  ),
  transactionHash: hexStringSchema
}).transform((data) =>
  applySpec<EchoEvent>({
    transactionHash: pipe(prop('transactionHash'), toLower),
    type: path(['topics', 0]),
    offerId: pipe<[typeof data], HexString, Lowercase<HexString>>(path(['topics', 1]), toLower<HexString>),
    from: path(['topics', 2])
  })(data)
)

export const echoEventsSchema = eventBlockDataSchema
  .array()
  .nonempty()
  .transform(
    pipe<[EventBlockData[]], EventLog[][], EventLog[][]>(
      map<EventBlockData, EventLog[]>(
        pipe(prop('logs'), filter<EventLog>(propEqWith('address', echoAddress, eqAddress)))
      ),
      reject(isEmpty)
    )
  )
  .pipe(echoEventSchema.array().nonempty().array())
  .transform(flatten)
