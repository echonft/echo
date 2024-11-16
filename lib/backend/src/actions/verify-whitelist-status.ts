'use server'
import { getAllWhitelistedContracts } from '@echo/firestore/crud/whitelisted-contract/get-all-whitelisted-contracts'
import { addWhitelistedUser } from '@echo/firestore/crud/whitelisted-user/add-whitelisted-user'
import type { Address } from '@echo/model/types/address'
import { getNftBalances } from '@echo/web3/services/get-nft-balances'
import { andThen, map, pipe, prop } from 'ramda'

export async function verifyWhitelistStatus(discordId: string, wallet: Address): Promise<boolean> {
  // Get all whitelisted contracts and check NFT balances
  const contracts = await pipe(getAllWhitelistedContracts, andThen(map(prop('address'))))()

  const balance = await getNftBalances({
    wallet,
    contracts
  })

  // If user has NFTs, add them to whitelist
  if (balance > 0) {
    await addWhitelistedUser(discordId)
    return true
  }

  return false
}
