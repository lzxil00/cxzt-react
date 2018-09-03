/**
 * Created by lzxil on 2018/8/31.
 */
import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Mine from "../component/Mine/Mine";
import Project from "../component/project/Project";
import Business from "../component/business/Business";
import NoMatch from "./component/NoMatch";
import {Button} from "antd-mobile";
import ChannelCommDetail from "../component/project/channelcommdetail/ChannelCommDetail";


export default class Routers extends Component {
    static defaultProps = {
        isLogin: false,// 登录状态
        handleLoginState: null,// 修改登录状态接口
        handleTitle: null,//修改NavBar接口
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Switch>
                {/*首页重定向到mine*/}
                <Route exact path="/" render={props => <Redirect to='/mine'/>} {...this.props}/>

                {/*登录页*/}
                <Route path="/login" render={(props) => (<Login {...props} {...this.props}/>)}/>

                <PrivateRoute exact path="/mine" component={Mine} {...this.props}/>

                <PrivateRoute exact path="/project" component={Project} {...this.props}/>
                <PrivateRoute exact path="/project/channel" component={ChannelCommDetail} {...this.props}/>

                <PrivateRoute exact path="/business" component={Business} {...this.props}/>
                <Route component={NoMatch}/>
            </Switch>
        );
    }
}

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {component: Component, location, ...rest} = this.props;
        const {isLogin} = this.props;
        return (
            <Route
                {...rest}
                render={() =>
                    isLogin ? (
                        <Component {...rest} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: location}
                            }}
                        />
                    )
                }
            />
        )
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false
        };
        props.handleTitle('登录');
    }

    login = () => {
        this.props.handleLoginState(true);
        this.setState({redirectToReferrer: true});
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: "/"}};
        const {redirectToReferrer} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }

        return (
            <div className="App-content">
                <h1>请登陆查看 {from.pathname}</h1>
                <Button onClick={this.login}>Log in</Button>
            </div>
        );
    }
}