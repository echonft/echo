import { DEFAULT_EXPIRATION_TIME } from '../../../src/constants/default-expiration-time'
import { addOffer } from '../../../src/crud/offer/add-offer'
import { deleteOffer } from '../../../src/crud/offer/delete-offer'
import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { offerMock } from '../../mocks/offer-mock'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('CRUD - offer - addOffer', () => {
  let id: string
  beforeAll(initialize)
  afterAll(terminate)
  afterEach(async () => {
    try {
      await deleteOffer(id)
    } catch (_err) {
      // offer was never created, test must have failed
    }
  })

  it('addOffer', async () => {
    const { receiver, receiverItems, sender, senderItems } = offerMock['LyCfl6Eg7JKuD7XJ6IPi']!
    id = await addOffer({ receiver, receiverItems, sender, senderItems })
    const newOffer = await findOfferById(id)
    const now = dayjs()
    const expirationDate = now.add(DEFAULT_EXPIRATION_TIME, 'day')
    expect(newOffer.createdAt?.isAfter(now.subtract(1, 'minute'))).toBeTruthy()
    expect(newOffer.createdAt?.isBefore(now.add(1, 'minute'))).toBeTruthy()
    expect(newOffer.expiresAt?.isAfter(expirationDate.subtract(1, 'minute'))).toBeTruthy()
    expect(newOffer.expiresAt?.isBefore(expirationDate.add(1, 'minute'))).toBeTruthy()
    expect(newOffer.receiver).toStrictEqual(receiver)
    expect(newOffer.receiverItems).toStrictEqual(receiverItems)
    expect(newOffer.sender).toStrictEqual(sender)
    expect(newOffer.senderItems).toStrictEqual(senderItems)
    expect(newOffer.postedAt).toBeUndefined()
    expect(newOffer.state).toBe('OPEN')
    expect(newOffer.threadId).toBeUndefined()
  })
})
