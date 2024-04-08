import { fetchNft } from '@echo/solana/services/fetch-nft'
import { pick, pipe, prop } from 'ramda'

void (async function () {
  const asset = await fetchNft({ cluster: 'mainnet-beta', address: 'GEfR7ksjhytn9yU972ihaYmvvTrrKQ2Jizs7zZKpARkQ' })
  console.log(`fetched ${JSON.stringify(pipe(prop('metadata'), pick(['uri']))(asset))}`)
  process.exit()
})()
