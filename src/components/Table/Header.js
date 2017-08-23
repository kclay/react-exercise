import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {


    state = {
        action: null
    }
    onChange = (event) => {
        this.setState({
            action: event.target.value
        })
    };
    onClick = () => {
        if (this.state.action) {
            this.props.onAction(this.state.action);
        }
    }

    render() {
        return (
            <div className="tablenav top">

                <div className="alignleft actions bulkactions">
                    <label htmlFor="bulk-action-selector-top"
                           className="screen-reader-text">Select bulk action</label>
                    <select onChange={this.onChange}
                            name="action" id="bulk-action-selector-top">
                        <option value="">Bulk Actions</option>

                        <option value="delete">Delete Post</option>
                    </select>
                    <input type="submit" id="doaction" className="button action"
                           value="Apply" onClick={this.onClick}/>
                </div>


                <br className="clear"/>
            </div>
        );
    }

}
Header.propTypes = {
    onAction: PropTypes.func.isRequired
};
export default Header;