import LandingResource from './routes/Landing.ts'

import { BodyParsingResource } from './types/requests.ts'
export { ErrorHandler } from './types/error_handler.ts'
import { ResponseResource } from './types/responses.ts'
import { StaticFilesResource } from './types/static_files_resource.ts'
import { WebSocketResource } from './types/web_socket.ts'
import { PersistRelationalResource } from './types/persistence/relational.ts'

export const resources = [
  LandingResource,
  BodyParsingResource,
  PersistRelationalResource,
  ResponseResource,
  StaticFilesResource,
  WebSocketResource,
]