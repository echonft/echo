import { createUmiInstance } from '@echo/solana/services/create-umi-instance'
import { getCollectionNfts } from '@echo/solana/services/get-collection-nfts'

void (async function () {
  const address = 'J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w'
  const umi = createUmiInstance('mainnet-beta')
  await getCollectionNfts(umi, address)
  process.exit()
})()
