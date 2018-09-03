/**
 * Created by lzxil on 2018/8/31.
 */
import React, {Component} from 'react';
import {Icon, Result} from "antd-mobile";

export default class NoMatch extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Result
                img={<Icon type="cross-circle-o" className="spe" style={{fill: '#F13642'}}/>}
                title="404"
                message="页面丢了，返回重试一下呗^_^"
            />
        );
    }
}