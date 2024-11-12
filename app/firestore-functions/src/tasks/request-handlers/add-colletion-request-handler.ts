import type { AddCollectionTaskData } from '@echo/firestore-functions/tasks/add-collection-task'
import { addCollection } from '@echo/firestore/crud/collection/add-collection'

export async function addColletionRequestHandler(data: AddCollectionTaskData) {
  await addCollection(data)
}
