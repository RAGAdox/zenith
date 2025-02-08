const ERROR_CODES = {
  METHOD_NOT_ALLOWED: {
    response: JSON.stringify({ error: "METHOD_NOT_ALLOWED", success: false }),
    status: 405,
  },
  AUTHENTICATION_ERROR: {
    response: JSON.stringify({ error: "AUTHENTICATION_ERROR", success: false }),
    status: 401,
  },
  AUTHORIZATION_ERROR: {
    response: JSON.stringify({ error: "AUTHORIZATION_ERROR", success: false }),
    status: 403,
  },
  BAD_REQUEST: {
    response: JSON.stringify({ error: "BAD_REQUEST", success: false }),
    status: 400,
  },
  NO_TOKEN: {
    response: JSON.stringify({ error: "TOKEN_NOT_FOUND", success: false }),
    status: 500,
  },
  TOKEN_FETCH_ERROR: {
    response: JSON.stringify({ error: "TOKEN_FETCH_ERROR", success: false }),
    status: 500,
  },
  INTERNAL_ERROR: {
    response: JSON.stringify({ error: "INTERNAL_ERROR", success: false }),
    status: 500,
  },
  NO_CURRENT_SONG: {
    response: JSON.stringify({ error: "NO_CURRENT_SONG", success: false }),
    status: 204,
  },
};

export default ERROR_CODES;
