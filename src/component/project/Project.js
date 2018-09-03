/**
 * Created by lzxil on 2018/8/31.
 */
import React, {Component} from 'react';
import {Button} from "antd-mobile";
import {withRouter} from "react-router-dom";

class Project extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {};
        props.handleTitle('项目');
    }

    render() {
        return (
            <div className="App-content">
                <h1>Project</h1>
                <Button onClick={()=>this.goToChannel()}>渠道</Button>
            </div>
        );
    }

    goToChannel() {
        const {history,location} = this.props;
        history.push(`${location.pathname}/channel`)
    }
}

Project = withRouter(Project);
export default Project