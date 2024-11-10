import type { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { Route } from '@echo/routing/services/route'
import type { Path } from '@echo/routing/types/path'
import type { RouteParams } from '@echo/routing/types/route'

interface Params extends RouteParams {
  projectId: string
  name: CloudFunctionName
}

class CloudFunctionRoute<TParams extends RouteParams = never> extends Route<TParams, never, never> {
  constructor(path: Path) {
    super(path, 'https://cloudfunctions.googleapis.com/v2beta')
  }
}

export const cloudFunctionRoute = new CloudFunctionRoute<Params>(
  '/projects/:projectId/locations/us-central1/functions/:name'
)
