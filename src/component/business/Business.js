/**
 * Created by lzxil on 2018/8/31.
 */
import React, {Component} from 'react';

export default class Business extends Component {
    static defaultProps={};

    constructor(props) {
        super(props);
        this.state = {};
        props.handleTitle('商机');
    }

    render() {
        return (
            <div className="App-content">
                <h1>Business</h1>
            </div>
        );
    }
}