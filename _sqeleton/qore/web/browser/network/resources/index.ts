import RouteResourceDatabase from './routes/Database.ts'
import RouteResourceLanding from './routes/Landing.ts'

import { ApiResource } from './types/api/index.ts'
import { ApiMetricsResource } from './types/api/metrics.ts'
import { ApiUsersResource } from './types/api/users.ts'
import { BodyParsingResource } from './types/requests.ts'
export { ErrorHandler } from './types/error_handler.ts'
import { ResponseResource } from './types/responses.ts'
import { StaticFilesResource } from './types/static_files_resource.ts'
import { WebSocketResource } from './types/web_socket.ts'

export const resources = [
  ApiResource,
  ApiMetricsResource,
  ApiUsersResource,
  BodyParsingResource,
  ResponseResource,
  StaticFilesResource,
  WebSocketResource,

  RouteResourceDatabase,
  RouteResourceLanding,
]