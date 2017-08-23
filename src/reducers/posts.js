import * as t from '../constants/ActionTypes';
import {createReducer} from 'redux-create-reducer';


const initialState = {
    loading: true,
    items: []
};

function handleLoadPostEnded(state, action) {
    let loading = false;
    return {...state, loading};
}
function handleLoadPostStart(state, action) {
    let loading = true;
    return {...state, loading}
}
function handleLoadSuccess(state, action) {

    let items = action.payload.posts;
    return {...state, items};
}

function handlePostUpdated(state, action) {
    const {post} = action.payload;

    const items = state.items.map(item => {
        return item.id === post.id ? post : item;
    });
    return {...state, items}

}
function handlePostImageInfo(state, action) {
    const {media, id} = action.payload;
    const items = state.items.map(item => {
        if (item.id === id) {
            return {...item, media}
        }
        return item;
    });
    return {...state, items}

}

const reducers = createReducer(initialState, {
    [t.LOAD_POSTS.START]: handleLoadPostStart,
    [t.LOAD_POSTS.SUCCEEDED]: handleLoadSuccess,
    [t.LOAD_POSTS.ENDED]: handleLoadPostEnded,
    [t.UPDATE_POST_TITLE.SUCCEEDED]: handlePostUpdated,
    [t.FETCH_IMAGE_INFO.SUCCEEDED]: handlePostImageInfo,
    [t.UPDATE_POST_IMAGE.SUCCEEDED]: handlePostUpdated

});

export default reducers;