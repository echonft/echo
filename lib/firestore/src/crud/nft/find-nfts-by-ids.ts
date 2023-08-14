import { findNftById } from './find-nft-by-id'
import { map } from 'ramda'

export const findNftsByIds = (ids: string[]) => Promise.all(map(findNftById)(ids))
