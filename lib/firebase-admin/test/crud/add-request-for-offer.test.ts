import { addRequestForOffer } from '../../src/crud/request-for-offer/add-request-for-offer'
import { setDocAndReturnSnapshot } from '../../src/utils/document/set-doc-and-return-snapshot'
import { requestForOfferSnapshots } from '../mocks/request-for-offer/request-for-offer-snapshot'
import { requestsForOffer } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('../../../utils/document/set-doc-and-return-snapshot')

describe('crud - request-for-offer - addRequestForOffer', () => {
  const mockSetDocAndReturnSnapshot = jest
    .mocked(setDocAndReturnSnapshot)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .mockResolvedValue(R.fromNullable(requestForOfferSnapshots['jUzMtPGKM62mMhEcmbN4']!, new Error()))
  const prototype = {
    senderId: 'oE6yUEQBPn7PZ89yMjKn',
    discordGuildId: '1',
    target: [{ chainId: 1, address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d' }],
    items: ['8hHFadIrrooORfTOLkBg', 'QFjMRNChUAHNswkRADXh']
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('valid prototype returns the new data', async () => {
    const result = await addRequestForOffer(prototype)
    expect(R.isError(result)).toBeFalsy()
    expect(R.getExn(result)).toStrictEqual(requestsForOffer['jUzMtPGKM62mMhEcmbN4'])
  })
  it('if set data returns an error, the call fails', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockSetDocAndReturnSnapshot.mockResolvedValueOnce({})
    const result = await addRequestForOffer(prototype)
    expect(R.isError(result)).toBeTruthy()
  })
})
