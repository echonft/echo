import { FirestoreOfferData } from '../types/model/data/offer/firestore-offer-data'
import { discordGuildFirestoreData } from './discord-guild-firestore-data'
import { nftFirestoreData } from './nft-firestore-data'
import { userFirestoreData } from './user-firestore-data'
import dayjs from 'dayjs'

export const offerFirestoreData: { [key: string]: FirestoreOfferData } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    refPath: 'offers/LyCfl6Eg7JKuD7XJ6IPi',
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    state: 'OPEN',
    discordGuild: discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj']!,
    threadId: '1231',
    sender: userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!,
    senderItems: [nftFirestoreData['QFjMRNChUAHNswkRADXh']!],
    receiver: userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!,
    receiverItems: [nftFirestoreData['8hHFadIrrooORfTOLkBg']!],
    postedAt: undefined,
    expiresAt: 1676984897,
    createdAt: 1676984897,
    activities: [{ date: 1676984897, toState: 'OPEN' }]
  },
  open: {
    refPath: 'offers/LyCfl6Eg7JKuD7XJ6IPi',
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    state: 'OPEN',
    discordGuild: discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj']!,
    threadId: '1231',
    sender: userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!,
    senderItems: [nftFirestoreData['QFjMRNChUAHNswkRADXh']!],
    receiver: userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!,
    receiverItems: [nftFirestoreData['8hHFadIrrooORfTOLkBg']!],
    postedAt: undefined,
    expiresAt: dayjs().add(1, 'day').unix(),
    createdAt: 1676984897,
    activities: [{ date: 1676984897, toState: 'OPEN' }]
  }
}
