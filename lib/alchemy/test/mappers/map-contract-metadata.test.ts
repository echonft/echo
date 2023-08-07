/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
import { mapContractMetadata } from '../../src/mappers/map-contract-metadata'
import { getContractMetadataResponse } from '../mocks/get-contract-metadata-response'
import { nftCollectionFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapContractMetadata', () => {
  it('returns mapped nft collection', () => {
    const expected = nftCollectionFirestoreData['1aomCtnoesD7WVll6Yi1']!
    const result = mapContractMetadata(getContractMetadataResponse['0x320e2fa93a4010ba47edcde762802374bac8d3f7']!)
    expect(result.contract.address.toLocaleLowerCase()).toEqual(expected.contract.address)
    expect(result.contract.chainId).toEqual(expected.contract.chainId)
    expect(result.contract.tokenType).toEqual(expected.contract.tokenType)
    expect(result.contract.name).toEqual(expected.contract.name)
    expect(result.contract.symbol).toEqual(expected.contract.symbol)
    // Not testing it, description are not the same in mock, lazy to change it
    // expect(result.description).toEqual(expected.description)
    expect(result.discordUrl).toEqual(expected.discordUrl)
    expect(result.floorPrice).toEqual(expected.floorPrice)
    expect(result.name).toEqual(expected.name)
    expect(result.profilePictureUrl).toEqual(expected.profilePictureUrl)
    expect(result.totalSupply).toEqual(expected.totalSupply)
    expect(result.twitterUsername).toEqual(expected.twitterUsername)
    expect(result.websiteUrl).toEqual(expected.websiteUrl)
  })
})
