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
import SelectAllHeader from "./SelectAllHeader";
import CheckCell from "./CheckCell";


class UnconnectedTable extends React.Component {


    state = {
        selected: [],
        selectAll: false
    };


    onCheckChanged = (checked, value) => {

        let selected = this.state.selected;
        if (checked) {
            this.setState({selected: [...selected, value]})
        } else {
            this.setState({selected: selected.filter(v => v !== value)})
        }
    };

    onSelectAllToggle = (selectAll) => {

        const selected = selectAll ? this.props.posts.map(p => p.id) : [];
        this.setState({selected: selected});
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
        const {selected} = this.state;
        return (
            <div className="wrap">
                <Header onAction={this.onHandleBulkAction}/>
                <ReactTable
                    data={posts}
                    columns={[

                        {
                            Header: () => <SelectAllHeader onChange={this.onSelectAllToggle}/>,
                            id: 'id',
                            resizable: false,
                            filterable: false,
                            sortable: false,
                            width: 50,
                            accessor: 'id',
                            Cell: props => <CheckCell value={props.value}
                                                      checked={selected.includes(props.value)}
                                                      onChange={this.onCheckChanged}/>
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


const Table = connect(
    null,
    mapDispatchToProps
)(UnconnectedTable);
export default Table;
export {
    UnconnectedTable
}

