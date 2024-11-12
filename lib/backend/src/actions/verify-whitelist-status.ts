import { getUserByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { getAllWhitelistedContracts } from '@echo/firestore/crud/whitelisted-contract/get-all-whitelisted-contracts'
import { addWhitelistedUser } from '@echo/firestore/crud/whitelisted-user/add-whitelisted-user'
import { getNftBalances } from '@echo/web3/services/get-nft-balances'
import { andThen, isNil, map, pipe, prop } from 'ramda'

export async function verifyWhitelistStatus(discordId: string): Promise<boolean> {
  const user = await getUserByDiscordId(discordId)
  if (isNil(user) || isNil(user.wallet)) {
    return false
  }

  // Get all whitelisted contracts and check NFT balances
  const contracts = await pipe(getAllWhitelistedContracts, andThen(map(prop('address'))))()

  const balance = await getNftBalances({
    wallet: user.wallet,
    contracts
  })

  // If user has NFTs, add them to whitelist
  if (balance > 0) {
    await addWhitelistedUser(discordId)
    return true
  }

  return false
}
