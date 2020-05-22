import React from "react";
import { DefaultButtonText } from "../../config/messages";

const Button = (props) => {
    return (
        <div>
            <button type="button" disabled={props.disabled} onClick={props.onClick}>{props.text !== "" ? props.text : { DefaultButtonText }}
            </button>
        </div>
    );
};
export default Button;