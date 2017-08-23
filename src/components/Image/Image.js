import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import postActions from '../../actions/posts';

import Spinner from "../Spinner/Spinner";
import styled, {css} from 'styled-components'


const imagesStyle = css`
  position absolute;
  top: 0;
  left: 0;
  width: 75px;
  height: 75px;
 
  `;
const ImgPlaceholder = styled.div`
  ${imagesStyle};
  opacity: ${props => props.deactivated ? 0 : 1};
  z-index: 1;
  transition: opacity .6s ease-in;
`;

const ImgFinal = styled.img`
  ${imagesStyle};
  opacity: ${props => props.loaded ? 1 : 0};
  transition: opacity .6s ease-in;
  z-index: 0;
`;

const EditLink = styled.a`
position absolute;
display:inline-block;
left:85px;
height:10px;
top:22.5px;
cursor:pointer;
`;
const Wrapper = styled.div`
position relative;
width: 75px;
  height: 75px;
`;
class Image extends React.Component {

    state = {
        image: null,
        loaded: false
    };

    componentDidMount() {
        this.checkForImage(this.props);
    }

    checkForImage(props) {
        const {post} = props;

        if (post.media) {
            const {thumbnail} = post.media.media_details.sizes;
            this.setState({
                image: thumbnail.source_url
            })
        } else if (post.featured_media) {
            this.loadImageFromId(post.id, post.featured_media);
        }

    }

    componentWillReceiveProps(nextProps) {
        const nextPost = nextProps.post;
        const {post} = this.props;
        if ((nextPost.featured_media !== post.featured_media)
            || (nextPost.media !== post.media)) {
            this.setState({
                loaded: false
            });
            this.checkForImage(nextProps);
        }
    }


    loadImageFromId(postId, mediaId) {
        const {actions} = this.props;
        actions.loadImageInfo(postId, mediaId);

    }

    onLoad = () => {
        this.setState({loaded: true});
    };

    onEditImage = (event) => {
        event.preventDefault();
        const {actions, post} = this.props;

        // If the media frame already exists, reopen it.
        if (this.frame) {
            this.frame.open();
            return;
        }

        // Create a new media frame
        const frame = this.frame = wp.media({
            title: 'Select or Upload Media Of Your Choice',
            button: {
                text: 'Use this media'
            },
            multiple: false  // Set to true to allow multiple files to be selected
        });

        frame.on('select', () => {
            const attachment = frame.state().get('selection').first().toJSON();

            if (attachment.id !== post.featured_media) {
                this.setState({
                    loaded: false
                });
                actions.updatePostImage(post.id, attachment.id);
            }

        })
    };

    render() {

        const {image, loaded} = this.state;

        const {post} = this.props;
        if (!post.featured_media) {
            return (
                <Wrapper>
                    <span>n/a</span>
                    <EditLink onClick={this.onEditImage}>edit</EditLink>
                </Wrapper>
            )
        }

        // TODO: Add image fading upon loading
        return (

            <Wrapper>
                <ImgFinal src={image} onLoad={this.onLoad} loaded={loaded}/>
                <ImgPlaceholder deactivated={loaded}>
                    <Spinner/>
                </ImgPlaceholder>
                <EditLink onClick={this.onEditImage}>edit</EditLink>

            </Wrapper>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}
export default connect(
    null,
    mapDispatchToProps
)(Image);