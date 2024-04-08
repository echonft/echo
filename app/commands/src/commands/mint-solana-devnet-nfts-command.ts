import { mintNfts } from '@echo/solana/services/mint-nfts'
import * as fs from 'fs/promises'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

interface Params {
  collection: {
    address: string
    name: string
    symbol: string
    uri: string
  }
  owners: {
    address: string
    quantity: number
  }[]
}

/**
 * Mint NFTs on Solana devnet from a JSON file.
 * See Params interface for the structure of the file.
 *
 * Arguments:
 *  -p  string  path to JSON file
 */
void (async function () {
  const { p } = await yargs(hideBin(process.argv))
    .options({
      p: {
        alias: 'path',
        describe: 'path to JSON file',
        type: 'string'
      }
    })
    .demandOption('p', 'path is required')
    .parse()
  const text = await fs.readFile(p, 'utf-8')
  const content = JSON.parse(text) as Params[]
  for (const param of content) {
    await mintNfts(param)
  }
})()
