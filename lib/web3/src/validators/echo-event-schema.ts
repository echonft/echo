import { addressSchema } from '@echo/model/validators/address-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { EchoEventTopic } from '@echo/web3/constants/echo-event-topic'
import { EchoEventType } from '@echo/web3/constants/echo-event-type'
import type { EchoEvent } from '@echo/web3/types/echo-event'
import { topicSchema } from '@echo/web3/validators/topic-schema'
import { applySpec, flatten, map, path, pipe, prop } from 'ramda'
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
  logs: object({
    address: addressSchema,
    topics: tuple([nativeEnum(EchoEventTopic).transform(echoEventTopicToType), topicSchema]).rest(
      topicSchema.pipe(addressSchema).optional()
    ),
    transactionHash: hexStringSchema
  })
    .array()
    .transform(
      map(
        applySpec<EchoEvent>({
          transactionHash: prop('transactionHash'),
          type: path(['topics', 0]),
          offerId: path(['topics', 1]),
          from: path(['topics', 2])
        })
      )
    )
})
  .array()
  .nonempty()
  .transform(pipe(map(prop('logs')), flatten))
