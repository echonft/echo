import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import dayjs from 'dayjs'

export const userMock: { [key: string]: FirestoreUser } = {
  '6rECUMhevHfxABZ1VNOm': {
    id: '6rECUMhevHfxABZ1VNOm',
    image: 'https://cdn.discordapp.com/avatars/884593489189433364/6080eecbd12f0f7bb2299690661535cf.png',
    name: 'crewnft_',
    updatedAt: dayjs.unix(1676984897)
  },
  oE6yUEQBPn7PZ89yMjKn: {
    id: 'oE6yUEQBPn7PZ89yMjKn',
    image: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
    name: 'johnnycagewins',
    updatedAt: dayjs.unix(1676984897)
  }
}
