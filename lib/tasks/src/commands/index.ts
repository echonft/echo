/* eslint-disable @typescript-eslint/no-empty-function */
import { Chain } from '@echo/model/constants/chain'
import type { Contract } from '@echo/model/types/contract'
import { fetchCollectionCommand } from '@echo/tasks/commands/fetch-collection-command'
import { fetchNftCommand } from '@echo/tasks/commands/fetch-nft-command'
import { fetchNftsForWalletCommand } from '@echo/tasks/commands/fetch-nfts-for-wallet-command'
import { findDuplicateCollections } from '@echo/tasks/commands/find-duplicate-collections'
import { removeDuplicateCollections } from '@echo/tasks/commands/remove-duplicate-collections'
import { updateCollectionCommand } from '@echo/tasks/commands/update-collection-command'
import { updateUserNftsCommand } from '@echo/tasks/commands/update-user-nfts-command'
import { updateUsersNftsCommand } from '@echo/tasks/commands/update-users-nfts-command'
import { updateWalletNftsCommand } from '@echo/tasks/commands/update-wallet-nfts-command'
import { stringComparator } from '@echo/utils/comparators/string-comparator'
import type { HexString } from '@echo/utils/types/hex-string'
import { getAddress } from '@echo/web3/helpers/get-address'
import { isAddress } from '@echo/web3/helpers/is-address'
import input from '@inquirer/input'
import select from '@inquirer/select'
import { applySpec, map, objOf, pipe, prop, sort, toLower, values } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

await yargs(hideBin(process.argv))
  .command(
    'fetch-collection',
    'Fetches a collection',
    () => {},
    async (_yargs) => {
      const address = await input({
        message: 'Address:',
        validate: (input: string) => {
          if (!isAddress(input, { strict: false })) {
            return 'invalid address'
          }
          return true
        }
      })
      const chain = await select({
        message: 'Chain:',
        choices: pipe(values, sort(stringComparator), map(objOf('value')))(Chain),
        default: Chain.Ethereum
      })
      const contract: Contract = applySpec<Contract>({
        address: pipe(getAddress, toLower<HexString>),
        chain: prop('chain')
      })({ address, chain })
      await fetchCollectionCommand(contract)
      process.exit(0)
    }
  )
  .command(
    'fetch-nft',
    'Fetches an NFT',
    () => {},
    async (_yargs) => {
      const address = await input({
        message: 'Collection address:',
        validate: (input: string) => {
          if (!isAddress(input, { strict: false })) {
            return 'invalid address'
          }
          return true
        }
      })
      const chain = await select({
        message: 'Collection chain:',
        choices: pipe(values, sort(stringComparator), map(objOf('value')))(Chain),
        default: Chain.Ethereum
      })
      const tokenId = await input({
        message: 'Token ID:'
      })
      const contract: Contract = applySpec<Contract>({
        address: pipe(getAddress, toLower<HexString>),
        chain: prop('chain')
      })({ address, chain })
      await fetchNftCommand(contract, tokenId)
      process.exit(0)
    }
  )
  .command(
    'fetch-nfts-for-wallet',
    'Fetches NFTs for a given wallet',
    () => {},
    async (_yargs) => {
      const address = await input({
        message: 'Address:',
        validate: (input: string) => {
          if (!isAddress(input, { strict: false })) {
            return 'invalid address'
          }
          return true
        }
      })
      const chain = await select({
        message: 'Chain:',
        choices: pipe(values, sort(stringComparator), map(objOf('value')))(Chain),
        default: Chain.Ethereum
      })
      const contract: Contract = applySpec<Contract>({
        address: pipe(getAddress, toLower<HexString>),
        chain: prop('chain')
      })({ address, chain })
      await fetchNftsForWalletCommand(contract)
      process.exit(0)
    }
  )
  .command(
    'update-collection',
    'Updates a collection in the database',
    () => {},
    async (_yargs) => {
      const address = await input({
        message: 'Address:',
        validate: (input: string) => {
          if (!isAddress(input, { strict: false })) {
            return 'invalid address'
          }
          return true
        }
      })
      const chain = await select({
        message: 'Chain:',
        choices: pipe(values, sort(stringComparator), map(objOf('value')))(Chain),
        default: Chain.Ethereum
      })
      const contract: Contract = applySpec<Contract>({
        address: pipe(getAddress, toLower<HexString>),
        chain: prop('chain')
      })({ address, chain })
      await updateCollectionCommand(contract)
      process.exit(0)
    }
  )
  .command(
    'update-user-nfts',
    'Updates the NFTs of a user',
    () => {},
    async (_yargs) => {
      const username = await input({
        message: 'Username:'
      })
      await updateUserNftsCommand(username)
      process.exit(0)
    }
  )
  .command(
    'update-wallet-nfts',
    'Updates the NFTs of a wallet',
    () => {},
    async (_yargs) => {
      const address = await input({
        message: 'Wallet address:',
        validate: (input: string) => {
          if (!isAddress(input, { strict: false })) {
            return 'invalid address'
          }
          return true
        }
      })
      const chain = await select({
        message: 'Wallet chain:',
        choices: pipe(values, sort(stringComparator), map(objOf('value')))(Chain),
        default: Chain.Ethereum
      })
      const wallet: Contract = applySpec<Contract>({
        address: pipe(getAddress, toLower<HexString>),
        chain: prop('chain')
      })({ address, chain })
      await updateWalletNftsCommand(wallet)
      process.exit(0)
    }
  )
  .command(
    'update-users-nfts',
    'Updates the NFTs of every users',
    () => {},
    async (_yargs) => {
      await updateUsersNftsCommand()
      process.exit(0)
    }
  )
  .command(
    'update-users-nfts',
    'Updates the NFTs of every users',
    () => {},
    async (_yargs) => {
      await updateUsersNftsCommand()
      process.exit(0)
    }
  )
  .command(
    'find-duplicate-collections',
    'Find duplicate collections in the database',
    () => {},
    async (_yargs) => {
      await findDuplicateCollections()
      process.exit(0)
    }
  )
  .command(
    'remove-duplicate-collections',
    'Remove duplicate collections (if any) from the database',
    () => {},
    async (_yargs) => {
      await removeDuplicateCollections()
      process.exit(0)
    }
  )
  .help().argv
