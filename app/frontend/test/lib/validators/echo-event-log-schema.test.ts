import { echoEventLogSchema } from '@echo/frontend/lib/validators/echo-event-log-schema'
import { flatten } from 'ramda'

describe('validators - echoEventLogSchema', () => {
  const baseRequest = {
    // blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
    // blockNumber: '0x63fd0c',
    // contractAddress: undefined,
    // cumulativeGasUsed: '0x5aafa',
    // effectiveGasPrice: '0xf433c',
    // from: '0x213be2f484ab480db4f18b0fe4c38e1c25877f09',
    // gasUsed: '0x4ff6c',
    // l1Fee: '0x4124c8f6ffa2',
    // l1GasPrice: '0x8b7a2',
    // l1GasUsed: '0x1458',
    logs: []
    // logsBloom:
    //   '0x04000000000000110000000000000000000000040000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000008000001200000000000000000000000000000000000000000000000000000000000008000000000000000000000000010000000000000000000000000000000800000000090000000000100100000000000000000000000000000000000800100000000001000000000000000000000400000000000000002000000000800000000000000000000000000000000000000000000000000000000200000000000000000000000000000008000000000000200000000',
    // status: '0x1',
    // to: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
    // transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
    // transactionIndex: '0x1',
    // type: '0x0'
  }

  const baseLog = {
    address: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
    topics: [],
    // data: '0x',
    // blockNumber: '0x63fd0c',
    transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3'
    // transactionIndex: '0x1',
    // blockHash: '0xae96c756448ee582e7132d8e93663be3571d17c2ead77c38e8a85454066aba78',
    // logIndex: '0x1',
    // removed: false
  }

  const offerExecutedRequest = [
    {
      ...baseRequest,
      logs: [
        {
          ...baseLog,
          topics: [
            '0x29b4fc7c563e5c9b23b0f5bef771f3129ee53ebecccd9ac7fda41aa2151960b3',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
          ],
          transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3'
        }
      ]
    }
  ]
  const offerCreatedRequest = [
    {
      ...baseRequest,
      logs: [
        {
          ...baseLog,
          topics: [
            '0x395be2bdef7155640f1587948c5cf433c6fe9b88ad5669088d8bc1a9c61df3ee',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
          ],
          transactionHash: '0x65ae321e2a53dedb323928269dbb034b57dda9bb2fe5c0b122285f020885eb39'
        }
      ]
    }
  ]

  const offerCancelledRequest = [
    {
      ...baseRequest,
      logs: [
        {
          ...baseLog,
          topics: [
            '0x551093dec6053933c320273f5b5e812f1ef7b496dacdb2f731e5f73fdc1d2eb9',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
          ],
          transactionHash: '0x4664390b4c801c31ffe4429b8a8047e5f352af0abbb7ad8476c677cc215c3ae8'
        }
      ]
    }
  ]

  const offerRedeemedRequest = [
    {
      ...baseRequest,
      logs: [
        {
          ...baseLog,
          topics: [
            '0x1594504a7c811ce21e1f2a4432d08642b655294645f9013644b04b308c9c1ad3',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
            '0x0000000000000000000000001e3918Dd44F427F056be6c8E132cf1b5f42dE59e'
          ],
          transactionHash: '0x881b42173bf4152af3d15d79a66da1e1bc6a3f4147ce3e10a8ae79d301e59d3d'
        }
      ]
    }
  ]

  const offerAcceptedRequest = [
    {
      ...baseRequest,
      logs: [
        {
          ...baseLog,
          topics: [
            '0x10e82270e7877745d674722466656a6c8029b331c5ffb182cac9c49fe996beac',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
          ],
          transactionHash: '0x662fa2d727ac148663df8534a8200270f995e4f1a278687e8764fd1be8e52057'
        }
      ]
    }
  ]

  const multipleEventsRequest = flatten([
    offerExecutedRequest,
    offerCreatedRequest,
    offerCancelledRequest,
    offerRedeemedRequest,
    offerAcceptedRequest
  ])

  const multipleLogsRequest = [
    {
      ...baseRequest,
      logs: [
        {
          ...baseLog,
          topics: [
            '0x10e82270e7877745d674722466656a6c8029b331c5ffb182cac9c49fe996beac',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
          ],
          transactionHash: '0x2921f7cdaec9455be87841e32afb7d0b10f249d6bfda169788cf9a596ac2b159'
        },
        {
          ...baseLog,
          topics: [
            '0x1594504a7c811ce21e1f2a4432d08642b655294645f9013644b04b308c9c1ad3',
            '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
            '0x0000000000000000000000001e3918Dd44F427F056be6c8E132cf1b5f42dE59e'
          ],
          transactionHash: '0xf980299c11f10a47db3719305ab9d2a9c1332d4fa4b1404e6f1e3176c2b120e2'
        }
      ]
    }
  ]

  const multipleEventsAndLogsRequest = multipleEventsRequest.concat(multipleLogsRequest)

  it('valid offerExecutedRequest', () => {
    expect(echoEventLogSchema.parse(offerExecutedRequest)).toStrictEqual([
      {
        transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_EXECUTED',
        from: undefined
      }
    ])
  })

  it('valid offerCreatedRequest', () => {
    expect(echoEventLogSchema.parse(offerCreatedRequest)).toStrictEqual([
      {
        transactionHash: '0x65ae321e2a53dedb323928269dbb034b57dda9bb2fe5c0b122285f020885eb39',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_CREATED',
        from: undefined
      }
    ])
  })

  it('valid offerCancelledRequest', () => {
    expect(echoEventLogSchema.parse(offerCancelledRequest)).toStrictEqual([
      {
        transactionHash: '0x4664390b4c801c31ffe4429b8a8047e5f352af0abbb7ad8476c677cc215c3ae8',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_CANCELLED',
        from: undefined
      }
    ])
  })

  it('valid offerRedeemedRequest', () => {
    expect(echoEventLogSchema.parse(offerRedeemedRequest)).toStrictEqual([
      {
        transactionHash: '0x881b42173bf4152af3d15d79a66da1e1bc6a3f4147ce3e10a8ae79d301e59d3d',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_REDEEMED',
        from: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
      }
    ])
  })

  it('valid offerAcceptedRequest', () => {
    expect(echoEventLogSchema.parse(offerAcceptedRequest)).toStrictEqual([
      {
        transactionHash: '0x662fa2d727ac148663df8534a8200270f995e4f1a278687e8764fd1be8e52057',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_ACCEPTED',
        from: undefined
      }
    ])
  })

  it('valid multipleEvents', () => {
    expect(echoEventLogSchema.parse(multipleEventsRequest)).toStrictEqual([
      {
        transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_EXECUTED',
        from: undefined
      },
      {
        transactionHash: '0x65ae321e2a53dedb323928269dbb034b57dda9bb2fe5c0b122285f020885eb39',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_CREATED',
        from: undefined
      },
      {
        transactionHash: '0x4664390b4c801c31ffe4429b8a8047e5f352af0abbb7ad8476c677cc215c3ae8',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_CANCELLED',
        from: undefined
      },
      {
        transactionHash: '0x881b42173bf4152af3d15d79a66da1e1bc6a3f4147ce3e10a8ae79d301e59d3d',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_REDEEMED',
        from: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
      },
      {
        transactionHash: '0x662fa2d727ac148663df8534a8200270f995e4f1a278687e8764fd1be8e52057',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_ACCEPTED',
        from: undefined
      }
    ])
  })

  it('valid multipleLogsRequest', () => {
    expect(echoEventLogSchema.parse(multipleLogsRequest)).toStrictEqual([
      {
        transactionHash: '0x2921f7cdaec9455be87841e32afb7d0b10f249d6bfda169788cf9a596ac2b159',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_ACCEPTED',
        from: undefined
      },
      {
        transactionHash: '0xf980299c11f10a47db3719305ab9d2a9c1332d4fa4b1404e6f1e3176c2b120e2',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_REDEEMED',
        from: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
      }
    ])
  })

  it('valid multipleEventsAndLogsRequest', () => {
    expect(echoEventLogSchema.parse(multipleEventsAndLogsRequest)).toStrictEqual([
      {
        transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_EXECUTED',
        from: undefined
      },
      {
        transactionHash: '0x65ae321e2a53dedb323928269dbb034b57dda9bb2fe5c0b122285f020885eb39',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_CREATED',
        from: undefined
      },
      {
        transactionHash: '0x4664390b4c801c31ffe4429b8a8047e5f352af0abbb7ad8476c677cc215c3ae8',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_CANCELLED',
        from: undefined
      },
      {
        transactionHash: '0x881b42173bf4152af3d15d79a66da1e1bc6a3f4147ce3e10a8ae79d301e59d3d',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_REDEEMED',
        from: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
      },
      {
        transactionHash: '0x662fa2d727ac148663df8534a8200270f995e4f1a278687e8764fd1be8e52057',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_ACCEPTED',
        from: undefined
      },
      {
        transactionHash: '0x2921f7cdaec9455be87841e32afb7d0b10f249d6bfda169788cf9a596ac2b159',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_ACCEPTED',
        from: undefined
      },
      {
        transactionHash: '0xf980299c11f10a47db3719305ab9d2a9c1332d4fa4b1404e6f1e3176c2b120e2',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_REDEEMED',
        from: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
      }
    ])
  })
})
