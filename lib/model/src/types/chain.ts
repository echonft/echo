import { Chain, chains } from '@echo/model/constants/chain'

export type ChainProps = (typeof chains)[Chain]
export type ChainId = ChainProps['id']
