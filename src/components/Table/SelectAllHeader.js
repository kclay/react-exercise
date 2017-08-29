import React from 'react';
import PropTypes from 'prop-types';


export default class SelectAllHeader extends React.Component {

    state = {
        selectAll: false
    }

    static propTypes = {

        onChange: PropTypes.func.isRequired
    }

    onChange = () => {
        let {onChange} = this.props;
        const selectAll = !this.state.selectAll;
        this.setState({selectAll: selectAll});
        onChange(selectAll);
    }

    render() {

        const {selectAll} = this.state;

        return (<div id="cb" className="manage-column column-cb check-column">
            <label className="screen-reader-text" htmlFor="cb-select-all-1">Select All</label>
            <input id="cb-select-all-1" type="checkbox"
                   checked={selectAll}
                   onChange={this.onChange}/></div>)
    }
}

