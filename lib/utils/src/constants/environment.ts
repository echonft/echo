import { isTest } from '@echo/utils/constants/is-test'
import type { Environment } from '@echo/utils/types/environment'

export const environment: Environment = process.env.ENV ?? isTest ? 'test' : 'development'
