import { getBaseLogger } from '@echo/utils/services/pino-logger'
import type { Logger } from '@echo/utils/types/logger'

export const firestoreLogger: Logger = getBaseLogger('Firestore')
