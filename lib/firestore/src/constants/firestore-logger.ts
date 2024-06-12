import { getGCloudProjectId } from '@echo/utils/helpers/get-gcloud-project-id'
import { getBaseLogger } from '@echo/utils/services/pino-logger'
import type { Logger } from '@echo/utils/types/logger'

export const firestoreLogger: Logger = getBaseLogger('Firestore', {
  baseMergeObject: { project_id: getGCloudProjectId() }
})
