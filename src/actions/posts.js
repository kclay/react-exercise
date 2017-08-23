import * as t from '../constants/ActionTypes';
import {createActionThunk} from 'redux-thunk-actions';
import axios from 'axios'


// grab wp-api info from php wp_localize_script
let ENDPOINT = window['wpApiSettings'] ? window['wpApiSettings'].root : '';

function cleanPostData(post) {
    post.title = post.title.rendered;
    return post;
}
/**
 *
 * @function
 * @name loadPosts
 * @param number page
 */
const loadPosts = createActionThunk(t.LOAD_POSTS, (page, {dispatch, getState}) => {

    let posts = [];
    return request('wp/v2/posts/&per_page=5', 'GET')
        .then(posts => {

            posts = posts.map(cleanPostData);
            return {posts}
        })


});

/**
 *
 * @function
 * @name updatePostTitle
 * @param number id
 * @param string title
 */
const updatePostTitle = createActionThunk(t.UPDATE_POST_TITLE, (id, title, {dispatch, getState}) => {
    return request(`wp/v2/posts/${id}`, 'POST', {title: title})

        .then(post => {
            post = cleanPostData(post);
            return {id: post.id, post}
        })
});

function request(uri, method, data, headers) {
    headers = headers || {};
    headers['X-WP-Nonce'] = window['wpApiSettings'].nonce;
    return axios({
        url: ENDPOINT + uri,
        method: method ? method : 'GET',
        headers: headers,
        data: data

    }).then(resp => resp.data)
}

const loadImageInfo = createActionThunk(t.FETCH_IMAGE_INFO, (id, mediaId) => {
    return request(`wp/v2/media/${mediaId}`)
        .then(media => {
            return {id: id, media}
        })
});

const deletePosts = createActionThunk(t.DELETE_POSTS, (ids, {dispatch}) => {
    return request('pro-photo/v1/posts/', 'DELETE', {
        ids: ids.join(',')
    }).then(data => {
        const {deleted} = data;
        if (deleted.length) {
            dispatch(loadPosts(1));
        }
        return {deleted}
    })
});

const updatePostImage = createActionThunk(t.UPDATE_POST_IMAGE, (id, mediaId) => {
    return request(`wp/v2/posts/${id}`, 'POST', {
        featured_media: mediaId
    }).then(post => {
        post = cleanPostData(post);
        return {id: post.id, post}
    })
});


export default {
    loadPosts: loadPosts,
    updatePostTitle: updatePostTitle,
    updatePostImage: updatePostImage,
    loadImageInfo: loadImageInfo,
    deletePosts: deletePosts

}