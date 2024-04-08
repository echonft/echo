import { createUmiInstance } from '@echo/solana/helpers/create-umi-instance'
import { cloneNft } from '@echo/solana/services/clone-nft'
import { createEchoProgram, delegateAndLock, ECHO_PROGRAM_ID } from '@echo/solana/types/sdk'
import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata'
import { findAssociatedTokenPda, SPL_TOKEN_PROGRAM_ID } from '@metaplex-foundation/mpl-toolbox'
import { publicKey, publicKeyBytes } from '@metaplex-foundation/umi'
import { SystemProgram, SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js'

void (async function () {
  const umi = createUmiInstance({ cluster: 'localnet', options: { defaultIdentity: true } })
  umi.programs.add(createEchoProgram())
  const { mint, metadata } = await cloneNft({ umi, address: 'E4Hz3CtTizzG9JemtQE57PYCkdESkSERigHZGYtumuTD' })
  const delegatePda = umi.eddsa.findPda(ECHO_PROGRAM_ID, [
    new TextEncoder().encode('echo-delegate'),
    publicKeyBytes(umi.payer.publicKey),
    publicKeyBytes(mint.publicKey)
  ])
  const token = findAssociatedTokenPda(umi, { mint: mint.publicKey, owner: umi.payer.publicKey })

  // await delegate(umi, {
  //   authority: umi.payer,
  //   metadata,
  //   mint: mint.publicKey,
  //   token,
  //   delegate: delegatePda,
  //   metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
  //   splTokenProgram: SPL_TOKEN_PROGRAM_ID,
  //   systemProgram: publicKey(SystemProgram.programId),
  //   sysvarInstructions: publicKey(SYSVAR_INSTRUCTIONS_PUBKEY)
  // }).sendAndConfirm(umi, { send: { skipPreflight: true } })
  //
  // console.log(`delegate done: ${delegatePda.toString()}`)
  //
  // await lock(umi, {
  //   owner: umi.payer,
  //   metadata,
  //   mint: mint.publicKey,
  //   token,
  //   delegate: delegatePda,
  //   metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
  //   splTokenProgram: SPL_TOKEN_PROGRAM_ID,
  //   systemProgram: publicKey(SystemProgram.programId),
  //   sysvarInstructions: publicKey(SYSVAR_INSTRUCTIONS_PUBKEY)
  // }).sendAndConfirm(umi, { send: { skipPreflight: true } })
  // console.log('lock done')

  const result = await delegateAndLock(umi, {
    authority: umi.payer,
    metadata,
    mint: mint.publicKey,
    token,
    delegate: delegatePda,
    metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
    splTokenProgram: SPL_TOKEN_PROGRAM_ID,
    systemProgram: publicKey(SystemProgram.programId),
    sysvarInstructions: publicKey(SYSVAR_INSTRUCTIONS_PUBKEY)
  }).sendAndConfirm(umi, { send: { skipPreflight: true } })

  console.log(`done ${JSON.stringify(result.result)}`)
  process.exit()
})()
