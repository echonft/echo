import type { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'

export type TaskData = Record<string, unknown>

export interface Task<T extends TaskData> {
  data: T
  name: CloudFunctionName
  options: {
    id: string
    uri: string
    scheduleTime?: Date
  }
}
