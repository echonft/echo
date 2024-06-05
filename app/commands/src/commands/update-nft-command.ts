import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { getNft } from '@echo/opensea/services/get-nft'
import { CHAIN_ETHEREUM } from '@echo/utils/constants/chains/chains'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { getChains } from '@echo/utils/helpers/get-chains'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { isNil } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/**
 * Arguments:
 *  -a  string              address
 *  -t  string              tokenId
 *  -c  string (optional)   chain name (defaults to 'ethereum')
 *
 *  Fetch the NFT for a given contract address and a tokenId from the OpenSea API and update it in the db
 */
void (async function () {
  const { a, c, t } = await yargs(hideBin(process.argv))
    .options({
      a: {
        alias: 'address',
        describe: 'address',
        type: 'string'
      }
    })
    .options({
      c: {
        alias: 'chain',
        describe: 'chain',
        type: 'string',
        choices: getChains(),
        default: CHAIN_ETHEREUM,
        coerce: (arg) => arg as ChainName
      }
    })
    .options({
      t: {
        alias: 'token',
        describe: 'token id',
        type: 'string'
      }
    })
    .demandOption('a', 'address is required')
    .demandOption('t', 'token id is required')
    .parse()

  try {
    const address = formatWalletAddress({ address: a, chain: c })
    pinoLogger.info(`fetching NFT #${t} for contract address ${a}`)
    try {
      initializeFirebase()
      const nft = await getNft({ contract: address, chain: c, identifier: t, fetch })
      if (isNil(nft)) {
        pinoLogger.error(`did not get any result`)
        return
      }
      const collection = await getCollection(nft.collection.slug)
      if (isNil(collection)) {
        pinoLogger.error(`collection ${nft.collection.slug} not in the database`)
      }
      await updateNft(nft)
      pinoLogger.info(`updated NFT #${t} for contract address ${a}`)
    } catch (e) {
      pinoLogger.error(`error updating NFT #${t} for contract address ${a}: ${errorMessage(e)}`)
      pinoLogger.error((e as Error).stack)
    }
  } catch (e) {
    pinoLogger.error(`address ${a} is not a valid address`)
  } finally {
    await terminateFirestore()
  }
  process.exit()
})()
