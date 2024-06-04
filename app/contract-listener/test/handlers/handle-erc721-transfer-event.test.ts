import { handleErc721TransferEvent } from '@echo/contract-listener/handlers/handle-erc721-transfer-event'
import { getChain } from '@echo/contract-listener/helpers/get-chain'
import { processEscrowTransfer } from '@echo/contract-listener/helpers/process-escrow-transfer'
import { processInTransfer } from '@echo/contract-listener/helpers/process-in-transfer'
import { processOutTransfer } from '@echo/contract-listener/helpers/process-out-transfer'
import { processSwapTransfer } from '@echo/contract-listener/helpers/process-swap-transfer'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getWalletDocumentDataMockById } from '@echo/firestore-mocks/wallet/get-wallet-document-data-mock-by-id'
import { walletMockCrewAddress, walletMockJohnnyAddress } from '@echo/model-mocks/wallet/wallet-mock'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import type { Erc721TransferLog } from '@echo/web3/types/log/erc721-transfer-log'
import { afterAll, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/contract-listener/helpers/process-escrow-transfer')
jest.mock('@echo/contract-listener/helpers/process-in-transfer')
jest.mock('@echo/contract-listener/helpers/process-out-transfer')
jest.mock('@echo/contract-listener/helpers/process-swap-transfer')
jest.mock('@echo/firestore/crud/wallet/get-wallet-by-address')

describe('parsers - handleErc721TransferEvent', () => {
  const chain = getChain()
  const johnnyAddress = walletMockJohnnyAddress()
  const crewAddress = walletMockCrewAddress()
  const randomAddress = '0xb89b705faa45e42c0fd0674a3420f0126c7197cd'
  const contractAddress = '0xtest'

  const processEscrowTransferMock = jest.mocked(processEscrowTransfer).mockResolvedValue()
  const processInTransferMock = jest.mocked(processInTransfer).mockResolvedValue()
  const processOutTransferMock = jest.mocked(processOutTransfer).mockResolvedValue()
  const processSwapTransferMock = jest.mocked(processSwapTransfer).mockResolvedValue()
  jest.mocked(getWalletByAddress).mockImplementation(async ({ address }) => {
    if (address === johnnyAddress) {
      return Promise.resolve(getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC'))
    }
    if (address === crewAddress) {
      return Promise.resolve(getWalletDocumentDataMockById('h6oTcucifUZtxI2ZbqrS'))
    }
    return Promise.resolve(undefined)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should discard if fromAddress or toAddress is nil', async () => {
    const log = {
      args: { from: null, to: null }
    } as unknown as Erc721TransferLog
    await handleErc721TransferEvent(log)
    expect(processEscrowTransferMock).not.toBeCalled()
    expect(processInTransferMock).not.toBeCalled()
    expect(processOutTransferMock).not.toBeCalled()
    expect(processSwapTransferMock).not.toBeCalled()
  })

  it('should process escrow OUT transaction', async () => {
    const log = {
      args: { from: getEchoAddressByChain(chain), to: johnnyAddress, id: 0 },
      address: contractAddress
    } as unknown as Erc721TransferLog
    await handleErc721TransferEvent(log)
    expect(processEscrowTransferMock).toBeCalledWith({
      from: getEchoAddressByChain(chain),
      to: johnnyAddress,
      tokenId: 0,
      contractAddress: contractAddress,
      chain
    })
    expect(processInTransferMock).not.toBeCalled()
    expect(processOutTransferMock).not.toBeCalled()
    expect(processSwapTransferMock).not.toBeCalled()
  })

  it('should process escrow IN transaction', async () => {
    const log = {
      args: { from: johnnyAddress, to: getEchoAddressByChain(chain), id: 0 },
      address: contractAddress
    } as unknown as Erc721TransferLog
    await handleErc721TransferEvent(log)
    expect(processEscrowTransferMock).toBeCalledWith({
      from: johnnyAddress,
      to: getEchoAddressByChain(chain),
      tokenId: 0,
      contractAddress: contractAddress,
      chain
    })
    expect(processInTransferMock).not.toBeCalled()
    expect(processOutTransferMock).not.toBeCalled()
    expect(processSwapTransferMock).not.toBeCalled()
  })

  it('should return if transferData is nil', async () => {
    const log = {
      args: { from: randomAddress, to: randomAddress, id: 0 },
      address: contractAddress
    } as unknown as Erc721TransferLog
    await handleErc721TransferEvent(log)
    expect(processInTransferMock).not.toBeCalled()
    expect(processOutTransferMock).not.toBeCalled()
    expect(processSwapTransferMock).not.toBeCalled()
  })

  it('should process out transfer if to is nil', async () => {
    const log = {
      args: { from: johnnyAddress, to: randomAddress, id: 0 },
      address: contractAddress
    } as unknown as Erc721TransferLog
    await handleErc721TransferEvent(log)
    expect(processOutTransferMock).toBeCalledWith({
      from: getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC'),
      to: undefined,
      tokenId: 0,
      contractAddress,
      chain
    })
    expect(processSwapTransferMock).not.toBeCalled()
  })

  it('should process in transfer if from is nil', async () => {
    const log = {
      args: { from: randomAddress, to: johnnyAddress, id: 0 },
      address: contractAddress
    } as unknown as Erc721TransferLog
    await handleErc721TransferEvent(log)
    expect(processInTransferMock).toBeCalledWith({
      from: undefined,
      to: getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC'),
      tokenId: 0,
      contractAddress,
      chain
    })
    expect(processSwapTransferMock).not.toBeCalled()
  })

  it('should process swap transfer', async () => {
    const log = {
      args: { from: crewAddress, to: johnnyAddress, id: 0 },
      address: contractAddress
    } as unknown as Erc721TransferLog
    await handleErc721TransferEvent(log)
    expect(processSwapTransferMock).toBeCalledWith({
      from: getWalletDocumentDataMockById('h6oTcucifUZtxI2ZbqrS'),
      to: getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC'),
      tokenId: 0,
      contractAddress,
      chain
    })
  })
})
