import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, withRouter} from "react-router-dom";

import TabBars from './TabBars';
import Routers from "./Routers";
import {Icon, NavBar} from "antd-mobile";

const Nav = withRouter(({history, children}) => (
    <NavBar
        mode="dark"
        icon={<Icon type="left"/>}
        onLeftClick={() => history.goBack()}
        rightContent={[
            <Icon key="0" type="ellipsis"/>,
        ]}
    >
        {children}
    </NavBar>
));

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 是否隐藏TabBars标识符
            isHiddenTabBars: true,
            // 是否登录标识符
            isLogin: false,
            // 标题
            title: '登录',
        }
    }

    render() {
        const {isLogin, isHiddenTabBars, title} = this.state;
        return (
            <Router>
                <div className="App">
                    <div className="App-nav">
                        <Nav>{title}</Nav>
                    </div>
                    <Routers
                        isLogin={isLogin}
                        handleLoginState={(isLogin) => this.setState({isLogin: isLogin, isHiddenTabBars: !isLogin})}
                        handleTitle={(title) => this.setState({title: title})}
                    />
                    <TabBars
                        hidden={isHiddenTabBars}
                        //隐藏工具栏接口
                        handleHiddenState={(isHiddenTabBars) => this.setState({isHiddenTabBars: isHiddenTabBars})}
                    />
                </div>
            </Router>
        );
    }
}