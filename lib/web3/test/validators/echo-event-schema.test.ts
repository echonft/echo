import type { Address } from '@echo/model/types/address'
import { echoAddress } from '@echo/web3/constants/echo-address'
import type { EventBlockData } from '@echo/web3/types/event-block-data'
import type { EventLog } from '@echo/web3/types/event-log'
import { echoEventsSchema } from '@echo/web3/validators/echo-event-schema'
import { describe, expect, it } from '@jest/globals'
import { concat, flatten, map, pipe, prop } from 'ramda'

describe('echoEventSchema', () => {
  const baseLog: Omit<EventLog, 'topics'> = {
    address: echoAddress,
    transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3'
  }
  const offerExecutedBlockData: EventBlockData[] = [
    {
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
  const offerCreatedBlockData: EventBlockData[] = [
    {
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

  const offerCancelledBlockData: EventBlockData[] = [
    {
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

  const offerRedeemedBlockData: EventBlockData[] = [
    {
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

  const offerAcceptedBlockData: EventBlockData[] = [
    {
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

  const multipleEventsBlockData: EventBlockData[] = flatten([
    offerExecutedBlockData,
    offerCreatedBlockData,
    offerCancelledBlockData,
    offerRedeemedBlockData,
    offerAcceptedBlockData
  ])

  const multipleLogsBlockData: EventBlockData[] = [
    {
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

  const multipleEventsAndLogsRequest: EventBlockData[] = concat(multipleEventsBlockData, multipleLogsBlockData)

  it('valid offerExecutedRequest', () => {
    expect(echoEventsSchema.parse(offerExecutedBlockData)).toStrictEqual([
      {
        transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_EXECUTED',
        from: undefined
      }
    ])
  })

  it('valid offerCreatedRequest', () => {
    expect(echoEventsSchema.parse(offerCreatedBlockData)).toStrictEqual([
      {
        transactionHash: '0x65ae321e2a53dedb323928269dbb034b57dda9bb2fe5c0b122285f020885eb39',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_CREATED',
        from: undefined
      }
    ])
  })

  it('valid offerCancelledRequest', () => {
    expect(echoEventsSchema.parse(offerCancelledBlockData)).toStrictEqual([
      {
        transactionHash: '0x4664390b4c801c31ffe4429b8a8047e5f352af0abbb7ad8476c677cc215c3ae8',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_CANCELLED',
        from: undefined
      }
    ])
  })

  it('valid offerRedeemedRequest', () => {
    expect(echoEventsSchema.parse(offerRedeemedBlockData)).toStrictEqual([
      {
        transactionHash: '0x881b42173bf4152af3d15d79a66da1e1bc6a3f4147ce3e10a8ae79d301e59d3d',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_REDEEMED',
        from: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
      }
    ])
  })

  it('valid offerAcceptedRequest', () => {
    expect(echoEventsSchema.parse(offerAcceptedBlockData)).toStrictEqual([
      {
        transactionHash: '0x662fa2d727ac148663df8534a8200270f995e4f1a278687e8764fd1be8e52057',
        offerId: '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358',
        type: 'OFFER_ACCEPTED',
        from: undefined
      }
    ])
  })

  it('valid multipleEvents', () => {
    expect(echoEventsSchema.parse(multipleEventsBlockData)).toStrictEqual([
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
    expect(echoEventsSchema.parse(multipleLogsBlockData)).toStrictEqual([
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
    expect(echoEventsSchema.parse(multipleEventsAndLogsRequest)).toStrictEqual([
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

  it('logs from echo and other contracts should filter out other contract events', () => {
    const otherContractBaseLog = {
      address: '0x43be93945e168a205d708f1a41a124fa302e1f76' as Address,
      transactionHash: '0x2cc171c068f47030a90fb440c416109d5aef8e623d1f86d679c7dfe3679a33d3'
    }
    const otherContractLog: EventLog = {
      ...otherContractBaseLog,
      topics: [
        '0x10e82270e7877745d674722466656a6c8029b331c5ffb182cac9c49fe996beac',
        '0x020edd13cfab51c04b7c29f447a18b1cdb70c989fc0c01471ad1aa0ec32fe358'
      ],
      transactionHash: '0x2921f7cdaec9455be87841e32afb7d0b10f249d6bfda169788cf9a596ac2b159'
    }
    const otherContractLog2: EventLog = {
      ...otherContractBaseLog,
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x00000000000000000000000007d31999c2bae29086133a5c93b07a481c5ddaea',
        '0x00000000000000000000000007d31999c2bae29086133a5c93b07a481c5ddaea',
        '0x000000000000000000000000000000000000000000000000000000000000012c'
      ],
      transactionHash: '0xf980299c11f10a47db3719305ab9d2a9c1332d4fa4b1404e6f1e3176c2b120e2'
    }
    const logs = pipe<[EventBlockData[]], EventLog[][], EventLog[], EventLog[]>(
      map<EventBlockData, EventLog[]>(prop('logs')),
      flatten,
      concat<EventLog>([otherContractLog, otherContractLog2])
    )(multipleEventsAndLogsRequest)

    expect(
      echoEventsSchema.parse([
        {
          logs
        }
      ])
    ).toStrictEqual([
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
