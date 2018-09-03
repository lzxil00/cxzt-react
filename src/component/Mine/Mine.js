/**
 * Created by lzxil on 2018/8/31.
 */
import React, {Component} from 'react';
import {Button} from "antd-mobile";
import {withRouter} from "react-router-dom";

class Mine extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
        props.handleTitle('我');
    }

    render() {
        const {isLogin} = this.props;
        return (
            <div className="App-content">
                <h1>Mine</h1>
                {
                    isLogin ?
                        <Button onClick={() => this.logout()}>退出登录</Button>
                        :
                        <Button onClick={() => this.login()}>登录</Button>
                }
            </div>
        );
    }

    login() {
        this.props.history.push('/login')
    }

    logout() {
        this.props.handleLoginState(false);
    }
}

Mine = withRouter(Mine);
export default Mine