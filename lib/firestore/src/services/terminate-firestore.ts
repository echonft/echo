import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getGCloudProjectId } from '@echo/utils/helpers/get-gcloud-project-id'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'

export async function terminateFirestore(logger?: Nullable<Logger>): Promise<void> {
  const projectId = getGCloudProjectId()
  const childLogger = logger?.child({ component: 'firebase', project_id: projectId })
  childLogger?.info('TERMINATE')
  try {
    await firestoreApp().terminate()
  } catch (e) {
    return Promise.resolve()
  }
}
