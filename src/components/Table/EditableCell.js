import React from 'react'
import {connect} from 'react-redux';
import postActions from '../../actions/posts';
import InlineEdit from 'react-edit-inline';

class EditableCell extends React.Component {


    state = {

        saving: false
    };


    commitChange = (data) => {
        const {saving} = this.state;
        if (saving) return;
        const {post, updatePostTitle} = this.props;

        this.setState({saving: true});

        updatePostTitle(post.id, data.title)
            .then(() => {
                this.setState({saving: false})
            });
    }

    render() {

        const {saving} = this.state;
        const {post, info} = this.props;
        return (
            <div>
                <InlineEdit
                    activeClassName="editing"
                    text={post[info.column.id]}
                    paramName="title"
                    minLength={3}
                    maxLength={65}
                    change={this.commitChange}
                    style={{
                        backgroundColor: '#f3f3f3',
                        minWidth: 250,
                        display: 'block',
                        margin: 0,
                        padding: 0,
                        fontSize: 15,
                        textDecoration: 'underline',
                        outline: 0,
                        border: 0
                    }}
                />
                {
                    saving ? <span>Saving....</span> : <small>click to edit</small>

                }

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePostTitle: (id, title) => dispatch(postActions.updatePostTitle(id, title))
    };
}
export default connect(
    null,
    mapDispatchToProps
)(EditableCell);
