/**
 * Created by lzxil on 2018/8/31.
 */
import React, {Component} from 'react';
import {TabBar} from "antd-mobile";
import {Icon} from "antd";
import {withRouter} from "react-router-dom";

class TabBars extends Component {
    static defaultProps = {
        hidden: false,
        handleHiddenState: null,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {hidden} = this.props;
        return (
            <div style={{}}>
                <TabBar
                    hidden={hidden}
                >
                    {this.renderTabBarItem('business', '商机', 'pay-circle-o', 'pay-circle', 0)}
                    {this.renderTabBarItem('project', '项目', 'appstore-o', 'appstore', 0)}
                    {this.renderTabBarItem('mine', '我', 'tag-o', 'tag', 1)}
                </TabBar>
            </div>
        );
    }

    renderTabBarItem(key = "key", title = "title", iconType = "tag-o", selectIconType = 'tag', badge = 0) {
        const {history, location} = this.props;
        return (
            <TabBar.Item
                icon={<Icon type={iconType} style={{fontSize: 20}}/>}
                selectedIcon={<Icon type={selectIconType} style={{fontSize: 20, color: '#108ee9 '}}/>}
                title={title}
                key={key}
                selected={location.pathname.split('/')[1] === key}
                onPress={() => {
                    history.push(`/${key}`);
                }}
                badge={badge}
            >
            </TabBar.Item>
        )
    }
}

TabBars = withRouter(TabBars);
export default TabBars