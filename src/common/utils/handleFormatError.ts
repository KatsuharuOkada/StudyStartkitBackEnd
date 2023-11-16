import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { GraphQLException } from '../exceptions/graphql.exception';

/**
 * Format error message before response to network.
 *
 * @export
 * @param {GraphQLError} error
 * @return {*}
 */
export function handleFormatError(error: GraphQLError): any {
  let errorResponse = {
    errorCode: error.extensions.code,
    errorMessage: error.message,
    path: error.path,
    locations: error.locations,
    extensions: error.extensions,
  };

  if (error.originalError instanceof GraphQLException) {
    const { errorCode, messageCode, details } = error.extensions.exception;
    errorResponse = {
      errorCode,
      errorMessage: error.message,
      path: error.path,
      locations: error.locations,
      extensions: {
        messageCode,
        details,
        stacktrace: error.originalError.stack,
      },
    };
  }
  return errorResponse;
}
