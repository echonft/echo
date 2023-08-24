import { getAddress } from 'ethers'
import { modify } from 'ramda'

export const addressPropToFirestore = () => modify<'address', string, string>('address', getAddress)
