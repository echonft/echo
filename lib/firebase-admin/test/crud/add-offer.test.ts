import { FirestoreOfferPrototype } from '../../../firestore/src/types/prototypes/offer/firestore-offer-prototype'
import { addOffer } from '../../src/crud/offer/add-offer'
import { getDocSnapshot } from '../../src/utils/document/get-doc-snapshot'
import { setDocAndReturnSnapshot } from '../../src/utils/document/set-doc-and-return-snapshot'
import { CollectionName, offerFirestoreData } from '@echo/firestore'
import { offers } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('../../src/utils/document/set-doc-and-return-snapshot')

describe('crud - offer - addOffer', () => {
  // TODO Should use mock here
  const mockSetDocAndReturnSnapshot = jest
    .mocked(setDocAndReturnSnapshot)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .mockResolvedValue(R.fromPromise(getDocSnapshot(CollectionName.OFFERS, 'LyCfl6Eg7JKuD7XJ6IPi')))
  const prototype = {
    discordGuildId: '1',
    senderId: 'oE6yUEQBPn7PZ89yMjKn',
    senderItems: offers['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems.map((nft) => nft.id),
    receiverId: 'oE6yUEQBPn7PZ89yMjKn',
    receiverItems: offers['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems.map((nft) => nft.id)
  } as FirestoreOfferPrototype

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('valid prototype returns the new data', async () => {
    const result = await addOffer(prototype)
    expect(R.isError(result)).toBeFalsy()
    expect(R.getExn(result)).toEqual(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!)
  })
  it('if set data returns an error, the call fails', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockSetDocAndReturnSnapshot.mockResolvedValueOnce({})
    const result = await addOffer(prototype)
    expect(R.isError(result)).toBeTruthy()
  })
})
