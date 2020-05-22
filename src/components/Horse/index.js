import React, { Component } from "react";
import Button from '../Button';

export default class Horse extends Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        return (
            <div className={this.props.display ? 'horse' : 'horse hidden'}>
                {this.props.error  && (<div className="error">{this.props.errMsg}</div>)}
                <form onSubmit={this.props.handleSubmit}>
                    <label>
                        Name:
                    <input type="text" required name="name" readOnly={this.props.readOnly}  value={this.props.name} onChange={this.props.handleChange} />
                    </label>
                    <label>
                        Favourite Food:
                    <input type="text" name="food" readOnly={this.props.readOnly}  value={this.props.food} onChange={this.props.handleChange} />
                    </label>
                    <label>
                        Height:
                    <input type="number" name="height" readOnly={this.props.readOnly}  value={this.props.height} onChange={this.props.handleChange}  />
                    </label>
                    <label>
                        Weight:
                    <input type="number" name="weight" readOnly={this.props.readOnly}  value={this.props.weight} onChange={this.props.handleChange}  />
                    </label>
                    {!this.props.readOnly && (<div className="buttonContainer">
                        <input type="submit" value="Submit" onClick={this.props.handleSubmit}/>
                        <Button text="Cancel" onClick={this.props.onCancelClick}></Button></div>)}

                </form>
            </div>
        );
    }
}