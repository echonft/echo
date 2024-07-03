import { OFFER_CREATED, OFFER_EXECUTED } from '@echo/frontend/lib/types/echo-event/echo-event-types'
import { echoEventLogSchema } from '@echo/frontend/lib/validators/echo-event-log-schema'

describe('validators - echoEventLogSchema', () => {
  const baseRequest = {
    blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
    blockNumber: '0x63fd0c',
    contractAddress: undefined,
    cumulativeGasUsed: '0x5aafa',
    effectiveGasPrice: '0xf433c',
    from: '0x213be2f484ab480db4f18b0fe4c38e1c25877f09',
    gasUsed: '0x4ff6c',
    l1Fee: '0x4124c8f6ffa2',
    l1GasPrice: '0x8b7a2',
    l1GasUsed: '0x1458',
    logs: [],
    logsBloom:
      '0x04000000000000110000000000000000000000040000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000008000001200000000000000000000000000000000000000000000000000000000000008000000000000000000000000010000000000000000000000000000000800000000090000000000100100000000000000000000000000000000000800100000000001000000000000000000000400000000000000002000000000800000000000000000000000000000000000000000000000000000000200000000000000000000000000000008000000000000200000000',
    status: '0x1',
    to: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
    transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
    transactionIndex: '0x1',
    type: '0x0'
  }
  const multipleEventsRequest = [
    {
      ...baseRequest,
      logs: [
        {
          address: '0x43be93945e168a205d708f1a41a124fa302e1f76',
          topics: [
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            '0x000000000000000000000000213be2f484ab480db4f18b0fe4c38e1c25877f09',
            '0x000000000000000000000000f37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
            '0x0000000000000000000000000000000000000000000000000000000000000002'
          ],
          data: '0x',
          blockNumber: '0x63fd0c',
          transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
          transactionIndex: '0x1',
          blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
          logIndex: '0x0',
          removed: false
        },
        {
          address: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
          topics: [
            '0x29b4fc7c563e5c9b23b0f5bef771f3129ee53ebecccd9ac7fda41aa2151960b3',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
          ],
          data: '0x',
          blockNumber: '0x63fd0c',
          transactionHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
          transactionIndex: '0x1',
          blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
          logIndex: '0x1',
          removed: false
        }
      ]
    },
    {
      ...baseRequest,
      logs: [
        {
          address: '0x43be93945e168a205d708f1a41a124fa302e1f76',
          topics: [
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            '0x000000000000000000000000213be2f484ab480db4f18b0fe4c38e1c25877f09',
            '0x000000000000000000000000f37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
            '0x0000000000000000000000000000000000000000000000000000000000000002'
          ],
          data: '0x',
          blockNumber: '0x63fd0c',
          transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
          transactionIndex: '0x1',
          blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
          logIndex: '0x0',
          removed: false
        },
        {
          address: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
          topics: [
            '0x395be2bdef7155640f1587948c5cf433c6fe9b88ad5669088d8bc1a9c61df3ee',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
          ],
          data: '0x',
          blockNumber: '0x63fd0c',
          transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
          transactionIndex: '0x1',
          blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
          logIndex: '0x1',
          removed: false
        }
      ]
    }
  ]

  const offerExecutedRequest = [
    {
      ...baseRequest,
      logs: [
        {
          address: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
          topics: [
            '0x29b4fc7c563e5c9b23b0f5bef771f3129ee53ebecccd9ac7fda41aa2151960b3',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
          ],
          data: '0x',
          blockNumber: '0x63fd0c',
          transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
          transactionIndex: '0x1',
          blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
          logIndex: '0x1',
          removed: false
        }
      ]
    }
  ]
  const offerCreatedRequest = [
    {
      ...baseRequest,
      logs: [
        {
          address: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
          topics: [
            '0x395be2bdef7155640f1587948c5cf433c6fe9b88ad5669088d8bc1a9c61df3ee',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
          ],
          data: '0x',
          blockNumber: '0x63fd0c',
          transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
          transactionIndex: '0x1',
          blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
          logIndex: '0x1',
          removed: false
        }
      ]
    }
  ]

  it('valid offerExecutedRequest', () => {
    expect(echoEventLogSchema.parse(offerExecutedRequest)).toStrictEqual([
      {
        transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: OFFER_EXECUTED,
        from: undefined
      }
    ])
  })

  it('valid offerCreatedRequest', () => {
    expect(echoEventLogSchema.parse(offerCreatedRequest)).toStrictEqual([
      {
        transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: OFFER_CREATED,
        from: undefined
      }
    ])
  })

  it('valid multipleEvents', () => {
    expect(echoEventLogSchema.parse(multipleEventsRequest)).toStrictEqual([
      {
        transactionHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: OFFER_EXECUTED,
        from: undefined
      },
      {
        transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: OFFER_CREATED,
        from: undefined
      }
    ])
  })
})
