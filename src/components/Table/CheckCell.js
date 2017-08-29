import React from 'react';
import PropTypes from 'prop-types';

const CheckCell = ({checked, value, onChange}) => {

    const handleOnChange = (event) => {
        let {value, checked} = event.target;
        value = parseInt(value, 10);

        onChange(checked, value);
    }

    return (
        <div scope="row" className="check-column">
            <label className="screen-reader-text" htmlFor="cb-select-10">Select
                Post {value}</label>
            <input id="cb-select-10" type="checkbox" name="post[]" value={value}
                   checked={checked }
                   onChange={handleOnChange}/>
            <div className="locked-indicator">
                <span className="locked-indicator-icon" aria-hidden="true"></span>
                <span className="screen-reader-text">“Post {value}” is locked</span>
            </div>
        </div>
    )

}


CheckCell.propTypes = {
    checked: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}
export default CheckCell