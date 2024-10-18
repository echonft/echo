import { EchoEventTopic } from '@echo/web3/constants/echo-event-topic'
import { EchoEventType } from '@echo/web3/constants/echo-event-type'

export function echoEventTopicToType(topic: EchoEventTopic): EchoEventType {
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
