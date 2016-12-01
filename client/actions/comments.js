export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const createComment = ({ eventId, commentId, text }) => ({
  type: CREATE_COMMENT_REQUEST,
  payload: { eventId, commentId, text },
});

export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const createCommentSuccess = (payload) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload,
});

export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';
export const createCommentFailure = ({ error }) => ({
  type: CREATE_COMMENT_FAILURE,
  payload: { error },
});