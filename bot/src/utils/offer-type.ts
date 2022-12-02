import { OfferType } from '@echo/model'

/**
 * Opposite offer type of a specified type. If buy, returns sell and vice versa
 * Used to be able to create buyer and counterparty items properly
 * @param type The type to return the opposite of
 */
export function opposite(type: OfferType): OfferType {
  return type === OfferType.BUY ? OfferType.SELL : OfferType.BUY
}
