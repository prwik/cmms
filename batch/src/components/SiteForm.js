import React, { Component } from 'react';

export default class SiteForm extends Component {

    render(){
        return(
            <div className="form_card">
                <form>
                    <label for='name'>Name:</label>
                    <br/>
                    <input className="form_input" type="text" name="name" />
                    <br/>
                    <label for="serial">Serial Number:</label>
                    <br/>
                    <input className="form_input" type="text" name="serial"/>
                    <br/>
                    <label for="description">Description:</label>
                    <br/>
                    <textarea className="form_input" name="description"/>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
