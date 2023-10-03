import { isDev } from '@echo/utils/constants/is-dev'

export const supportedChains = isDev ? [11155111] : [1]
