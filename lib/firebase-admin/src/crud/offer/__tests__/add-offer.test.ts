import { FirestoreOfferPrototype } from '../../../types/prototypes/offer/firestore-offer-prototype'
import { setDocAndReturnSnapshot } from '../../../utils/document/set-doc-and-return-snapshot'
import { offerEquals } from '../../../utils/test/mocks/offer/offer-equals'
import { offerSnapshots } from '../../../utils/test/mocks/offer/offer-snapshot'
import { addOffer } from '../add-offer'
import { mockOffer } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('../../../utils/document/set-doc-and-return-snapshot')

describe('crud - offer - addOffer', () => {
  const mockSetDocAndReturnSnapshot = jest
    .mocked(setDocAndReturnSnapshot)
    .mockResolvedValue(R.fromNullable(offerSnapshots['LyCfl6Eg7JKuD7XJ6IPi']!, new Error()))
  const prototype = {
    discordGuildId: '1',
    senderId: 'oE6yUEQBPn7PZ89yMjKn',
    senderItems: mockOffer.senderItems,
    receiverId: 'oE6yUEQBPn7PZ89yMjKn',
    receiverItems: mockOffer.receiverItems
  } as unknown as FirestoreOfferPrototype
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('valid prototype returns the new data', async () => {
    const result = await addOffer(prototype)
    expect(R.isError(result)).toBeFalsy()
    offerEquals(R.getExn(result), mockOffer)
  })
  it('if set data returns an error, the call fails', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockSetDocAndReturnSnapshot.mockResolvedValueOnce({})
    const result = await addOffer(prototype)
    expect(R.isError(result)).toBeTruthy()
  })
})
