import React from 'react'
import ReactTable from 'react-table'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import postActions from '../../actions/posts';

import 'react-table/react-table.css'
import './Table.css';
import Image from '../Image';
import EditableCell from "./EditableCell";
import Header from "./Header";


class Table extends React.Component {


    state = {
        selected: [],
        selectAll: false
    };


    onCheckChanged = (event) => {
        let value = parseInt(event.target.value, 10);
        let selected = this.state.selected;
        if (event.target.checked) {
            this.setState({selected: [...selected, value]})
        } else {
            this.setState({selected: selected.filter(v => v !== value)})
        }
    };

    onSelectAllToggle = (event) => {

        const selectAll = !this.state.selectAll;
        const selected = selectAll ? this.props.posts.map(p => p.id) : [];
        this.setState({selectAll: selectAll, selected: selected});
    };

    onHandleBulkAction = (action) => {
        switch (action) {
            case 'delete':
                this.onDeletePosts();

                break;
        }
    }

    onDeletePosts() {
        const {selected} = this.state;
        const {actions} = this.props;
        if (!selected.length) {
            alert('You must select a least one post to delete.');
            return;
        }
        let answer = confirm(`Are you sure you want to delete the selected (${selected.length}) posts?`);

        if (!answer) return;
        actions.deletePosts(selected)

    }

    render() {
        const {posts} = this.props;
        const {selected, selectAll} = this.state;
        return (
            <div className="wrap">
                <Header onAction={this.onHandleBulkAction}/>
                <ReactTable
                    data={posts}
                    columns={[

                        {
                            Header: () => (<div id="cb" className="manage-column column-cb check-column">
                                <label className="screen-reader-text" htmlFor="cb-select-all-1">Select All</label>
                                <input id="cb-select-all-1" type="checkbox"
                                       checked={selectAll}
                                       onChange={this.onSelectAllToggle}/></div>),
                            id: 'id',
                            resizable: false,
                            filterable: false,
                            sortable: false,
                            width: 50,
                            accessor: 'id',
                            Cell: props => (
                                <div scope="row" className="check-column">
                                    <label className="screen-reader-text" htmlFor="cb-select-10">Select
                                        Post {props.value}</label>
                                    <input id="cb-select-10" type="checkbox" name="post[]" value={props.value}
                                           checked={selected.includes(props.value) }
                                           onChange={this.onCheckChanged}/>
                                    <div className="locked-indicator">
                                        <span className="locked-indicator-icon" aria-hidden="true"></span>
                                        <span className="screen-reader-text">“Post {props.value}” is locked</span>
                                    </div>
                                </div>
                            )
                        },
                        {
                            Header: 'Title',
                            id: 'title',
                            accessor: p => p.title,
                            Cell: info => <EditableCell
                                post={posts[info.index]}
                                info={info}/>
                        },
                        {
                            Header: 'Featured Image',
                            accessor: 'featured_media',
                            Cell: info => <Image info={info} post={posts[info.index]}/>
                        }

                    ]}
                />
            </div>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}


export {
    Table
}

export default connect(
    null,
    mapDispatchToProps
)(Table);