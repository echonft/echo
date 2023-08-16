import { CollectionName } from '../../../src/constants/collection-name'
import { addOffer } from '../../../src/crud/offer/add-offer'
import { getDocSnapshot } from '../../../src/helpers/document/get-doc-snapshot'
import { setDocAndReturnSnapshot } from '../../../src/helpers/document/set-doc-and-return-snapshot'
import { FirestoreOfferPrototype } from '../../../src/types/prototypes/offer/firestore-offer-prototype'
import { offerFirestoreData } from '../../mocks/offer/offer-firestore-data'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { prop } from 'ramda'

jest.mock('../../../src/utils/document/set-doc-and-return-snapshot')

describe('crud - offer - addOffer', () => {
  // TODO Should use mock here
  const mockSetDocAndReturnSnapshot = jest
    .mocked(setDocAndReturnSnapshot)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .mockResolvedValue(getDocSnapshot(CollectionName.OFFERS, 'LyCfl6Eg7JKuD7XJ6IPi'))
  const prototype = {
    discordGuildId: '1',
    senderId: 'oE6yUEQBPn7PZ89yMjKn',
    senderItems: offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems.map(prop('id')),
    receiverId: 'oE6yUEQBPn7PZ89yMjKn',
    receiverItems: offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems.map(prop('id'))
  } as FirestoreOfferPrototype

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('valid prototype returns the new data', async () => {
    const result = await addOffer(prototype)
    expect(result).toEqual(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!)
  })
  it('if set data returns an error, the call fails', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockSetDocAndReturnSnapshot.mockResolvedValueOnce({})
    try {
      await addOffer(prototype)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
