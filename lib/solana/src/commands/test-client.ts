import { createUmiInstance } from '@echo/solana/helpers/create-umi-instance'
import { cloneNft } from '@echo/solana/services/clone-nft'
import { createEchoProgram } from '@echo/solana/types/sdk'
import { delegateStandardV1, lockV1, TokenStandard } from '@metaplex-foundation/mpl-token-metadata'
import { createSignerFromKeypair, signerIdentity } from '@metaplex-foundation/umi'
import bs58 from 'bs58'

void (async function () {
  const umi = createUmiInstance({ cluster: 'localnet', options: { defaultIdentity: true } })
  umi.programs.add(createEchoProgram())
  const owner = umi.payer
  const { mint } = await cloneNft({ umi, address: '4YYk3ExiMERBSQGULCNEHUtsnutLxDLX3ScNrjQc6Y4F' })
  const deletageKey = bs58.decode(
    '4j1WdAuxYWyrassEm2DHVSne9JKev5oRhtejTHfZbhyFvtMPLA22K9X7rWUf1VQ5YkBMzxA1VktQRZgsaqdKixR9'
  )
  const delegate = createSignerFromKeypair(umi, umi.eddsa.createKeypairFromSecretKey(deletageKey))

  const delegateResult = await delegateStandardV1(umi, {
    mint: mint.publicKey,
    delegate: delegate.publicKey,
    tokenStandard: TokenStandard.NonFungibleEdition
  }).sendAndConfirm(umi)
  console.log(`delegate done ${JSON.stringify(delegateResult.result)}`)

  const delegateSignerUmi = umi.use(signerIdentity(delegate, false))
  const lockResult = await lockV1(delegateSignerUmi, {
    mint: mint.publicKey,
    tokenOwner: owner.publicKey,
    tokenStandard: TokenStandard.NonFungible
  }).sendAndConfirm(umi)
  console.log(`lock done ${JSON.stringify(lockResult.result)}`)

  process.exit()
})()
