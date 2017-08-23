/**
 * Constants are important - they describe what type of action is performed
 * within your app. Combined with the DevTools/logger, you can see how state and subsequently
 * your UI is being affected.
 */

/**
 * @typedef {Object} ThunkActionType
 * @property START
 * @property SUCCEEDED
 * @property FAILED
 * @property ENDED
 */
/**
 *
 * @param type
 * @returns String|ThunkActionType
 */
function makeThunkActionType(type) {
    const TYPE_START = `${type}_STARTED`;
    const TYPE_SUCCEEDED = `${type}_SUCCEEDED`;
    const TYPE_FAILED = `${type}_FAILED`;
    const TYPE_ENDED = `${type}_ENDED`;

    return Object.assign(type,
        {
            START: TYPE_START,
            SUCCEEDED: TYPE_SUCCEEDED,
            FAILED: TYPE_FAILED,
            ENDED: TYPE_ENDED

        }
    );

}

export const LOAD_POSTS = makeThunkActionType('LOAD_POSTS');
export const UPDATE_POST_TITLE = makeThunkActionType('UPDATE_POST_TITLE');
export const FETCH_IMAGE_INFO = makeThunkActionType('FETCH_IMAGE_INFO');
export const UPDATE_POST_IMAGE = makeThunkActionType('UPDATE_POST_IMAGE');
export const DELETE_POSTS = makeThunkActionType('DELETE_POSTS');


