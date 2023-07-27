import { addRequestForOffer } from '../../../src/crud/request-for-offer/add-request-for-offer'
import { getDocSnapshot } from '../../../src/utils/document/get-doc-snapshot'
import { setDocAndReturnSnapshot } from '../../../src/utils/document/set-doc-and-return-snapshot'
import { CollectionName, requestForOfferFirestoreData } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('../../../src/utils/document/set-doc-and-return-snapshot')

describe('crud - request-for-offer - addRequestForOffer', () => {
  // TODO Should use mock here
  const mockSetDocAndReturnSnapshot = jest
    .mocked(setDocAndReturnSnapshot)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .mockResolvedValue(R.fromPromise(getDocSnapshot(CollectionName.REQUESTS_FOR_OFFER, 'jUzMtPGKM62mMhEcmbN4')))
  const prototype = {
    senderId: 'oE6yUEQBPn7PZ89yMjKn',
    discordGuildId: '1',
    target: [{ chainId: 1, address: '0x12c63bbD266dB84e117356e664f3604055166CEc' }],
    items: ['8hHFadIrrooORfTOLkBg', 'QFjMRNChUAHNswkRADXh']
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('valid prototype returns the new data', async () => {
    const result = await addRequestForOffer(prototype)
    expect(R.isError(result)).toBeFalsy()
    expect(R.getExn(result)).toEqual(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4'])
  })
  it('if set data returns an error, the call fails', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockSetDocAndReturnSnapshot.mockResolvedValueOnce({})
    const result = await addRequestForOffer(prototype)
    expect(R.isError(result)).toBeTruthy()
  })

  it('if the data is invalid, throws', async () => {
    try {
      await addRequestForOffer({ ...prototype, discordGuildId: '0' })
      expect(false).toBeTruthy()
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
