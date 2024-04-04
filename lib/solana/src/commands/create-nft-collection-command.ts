import { createUmiInstance } from '@echo/solana/services/create-umi-instance'
import { createNft } from '@metaplex-foundation/mpl-token-metadata'
import { generateSigner, percentAmount } from '@metaplex-foundation/umi'

void (async function () {
  const umiDevnet = createUmiInstance('devnet')
  const collectionMint = generateSigner(umiDevnet)
  await createNft(umiDevnet, {
    mint: collectionMint,
    name: 'Mad Lads',
    symbol: 'MAD',
    uri: 'https://example.com/my-collection.json',
    sellerFeeBasisPoints: percentAmount(5.5), // 5.5%
    isCollection: true
  }).sendAndConfirm(umiDevnet)
  process.exit()
})()
