import { echoOfferToBaseOffer } from '@echo/backend/mappers/echo-offer-to-base-offer'
import { getCollectionByAddress } from '@echo/firestore/crud/collection/get-collection-by-address'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { collectionMocks } from '@echo/model/mocks/collection-mock'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { baseOfferMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { toPromise } from '@echo/utils/helpers/to-promise'
import type { Nullable } from '@echo/utils/types/nullable'
import { echoOfferMock } from '@echo/web3/mocks/echo-offer-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { find, pipe, propEq } from 'ramda'

jest.mock('@echo/firestore/crud/collection/get-collection-by-address')
jest.mock('@echo/firestore/crud/nft/get-nft-by-index')

describe('mappers - contractOfferToBaseOffer', () => {
  jest
    .mocked(getCollectionByAddress)
    .mockImplementation((contract) => pipe(find<Collection>(propEq(contract, 'contract')), toPromise)(collectionMocks))
  jest
    .mocked(getNftByIndex)
    .mockImplementation((index) => pipe(find<Nft>(eqNft(index)), toPromise<Nullable<Nft>>)(nftMocks))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('maps correctly', async () => {
    await expect(echoOfferToBaseOffer(echoOfferMock)).resolves.toStrictEqual(baseOfferMockFromJohnnycage)
  })
})
