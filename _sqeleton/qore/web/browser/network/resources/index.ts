import DatabaseResource from './routes/Database.ts'
import LandingResource from './routes/Landing.ts'

import { ApiResource } from './types/api/index.ts'
import { ApiUsersResource } from './types/api/users.ts'
import { BodyParsingResource } from './types/requests.ts'
export { ErrorHandler } from './types/error_handler.ts'
import { ResponseResource } from './types/responses.ts'
import { StaticFilesResource } from './types/static_files_resource.ts'
import { WebSocketResource } from './types/web_socket.ts'

export const resources = [
  ApiResource,
  ApiUsersResource,
  DatabaseResource,
  LandingResource,
  BodyParsingResource,
  ResponseResource,
  StaticFilesResource,
  WebSocketResource,
]