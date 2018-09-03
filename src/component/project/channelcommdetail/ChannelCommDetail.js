import React, {Component} from 'react';
import {Tabs, DatePicker, Button, ActivityIndicator} from 'antd-mobile';

import calender from './img/calender.svg';
import pieChart from './img/pie-chart.svg';
import orderedList from './img/ordered-list.svg';
import lineChart from './img/line-chart.svg';
import pieChartActivity from './img/pie-chart-activity.svg';
import orderedListActivity from './img/ordered-list-activity.svg';
import lineChartActivity from './img/line-chart-activity.svg';
import medal_1 from './img/medal-1.svg';
import medal_2 from './img/medal-2.svg';
import medal_3 from './img/medal-3.svg';
import medal_other from './img/medal-other.svg';

import './ChannelCommDetail.css';
// import 'antd-mobile/dist/antd-mobile.css';

import test_api_1_out from './test_api_1'

// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/legend');
require('echarts/lib/component/axis');

const TabBar = ({tab = 0, goToTab}) => (
    <div className="TabBar">
        <img className="tab-icon"
             style={tab === 0 ? {backgroundColor: '#108ee9'} : {}}
             src={tab === 0 ? pieChartActivity : pieChart}
             alt="pieChart"
             onClick={() => goToTab(0)}/>
        <img className="tab-icon"
             style={tab === 1 ? {backgroundColor: '#108ee9'} : {}}
             src={tab === 1 ? orderedListActivity : orderedList}
             alt="orderedList"
             onClick={() => goToTab(1)}/>
        <img className="tab-icon"
             style={tab === 2 ? {backgroundColor: '#108ee9'} : {}}
             src={tab === 2 ? lineChartActivity : lineChart}
             alt="lineChart"
             onClick={() => goToTab(2)}/>
    </div>
);
const tabs = [
    {title: '本月佣金'},
    {title: '本月门店佣金'},
    {title: '本年佣金'}
];
// 小屏展示数量
const showCount = 5;
export default class ChannelCommDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: false,
            commCycle: this.getCurrentDate(),
            activeTab: 0,
            amount: '0.00', //本月佣金
            amountYear: '0.00', //本年佣金
            tab1Info: [],
            tab2Info: {
                first: {},
                last: {},
                detail: [],
            },
            tab3Info: [],
            isShowAll: false,    //是否横屏展示所有月份数据
        };
        this.innerGoToTab = function () {
        };
    }

    render() {
        return (
            <div className="App-content">
                <div>
                    <ActivityIndicator toast text="正在加载..." animating={this.state.animating}/>
                    {/*上部 日期*/}
                    <div className="top">
                        <div className="date">
                            {this.state.commCycle.getFullYear() + "年" + (this.state.commCycle.getMonth() + 1) + "月"}
                        </div>
                        <DatePicker
                            mode="month"
                            format="YYYY-MM"
                            title="选择账期"
                            minDate={new Date(2018, 4)}
                            maxDate={this.getCurrentDate()}
                            value={this.state.commCycle}
                            onChange={date => this.handleChangeDate(date)}
                        >
                            <img src={calender} className="calender" alt="logo"/>
                        </DatePicker>
                    </div>
                    {/*中部 标题 tab标识*/}
                    <div className="middle-top">
                        <div className="title">{tabs[this.state.activeTab].title}</div>
                        <TabBar tab={this.state.activeTab} goToTab={(tab) => this.goToTab(tab)}/>
                    </div>
                    <Tabs
                        tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => {
                            this.setState({
                                activeTab: index,
                            });
                        }}
                        renderTabBar={(props) => {
                            this.innerGoToTab = props.goToTab;
                        }}
                        prerenderingSiblingsNumber={2}
                        swipeable={true}
                    >
                        <div className="tabDiv">
                            <div className="middle-bottom">
                                {this.toThousands(this.state.amount)}
                            </div>
                            <div id="chart1" className="chartDiv">
                            </div>
                            {this.renderTab1Info()}
                        </div>
                        <div className="tabDiv">
                            <div className="middle-bottom">
                                {this.toThousands(this.state.amount)}
                            </div>
                            {this.renderTab2Info()}
                        </div>
                        <div className="tabDiv">
                            <div className="middle-bottom">
                                {this.toThousands(this.state.amountYear)}
                            </div>
                            <div id="chart3" className="chartDiv"
                                 style={{display: this.state.isShowAll ? 'none' : 'block'}}>
                            </div>
                            <div id="chart3-all" className="chartAllDiv"
                                 style={{display: !this.state.isShowAll ? 'none' : 'block'}}>
                            </div>
                            {
                                this.state.tab3Info.length > showCount ?
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            this.showAll()
                                        }}>{this.state.isShowAll ? '收起' : '展开全年佣金'}</Button>
                                    :
                                    <div></div>
                            }
                            {
                                this.state.tab3Info.length === 0 ?
                                    <div className="rankTitle">暂无数据</div>
                                    :
                                    <div></div>
                            }
                        </div>
                    </Tabs>
                </div>
            </div>
        );
    }

    goToTab(tab) {
        this.innerGoToTab(tab);
        this.setState({
            activeTab: tab
        });
    }

    componentDidMount() {
        this.handleChangeDate(this.getCurrentDate());
    }

    renderCharts() {
        let chart1 = echarts.init(document.getElementById('chart1'), 'light');
        chart1.setOption({
            series: [
                {
                    startAngle: 225,
                    silent: true,
                    type: 'pie',
                    radius: ['35%', '60%'],
                    center: ['50%', '50%'],
                    label: {
                        formatter: '{c}\n{b}'
                    },
                    data: this.state.tab1Info,
                }
            ]
        });

        // 构建数据
        let xAxisData = [];
        let seriesData = [];
        let isHorizontal = this.state.tab3Info.length > showCount && this.state.isShowAll; //是否横屏显示
        // 总长度大于showCount并且不竖屏展示部分数据
        let tabInfo = isHorizontal ? this.state.tab3Info : this.state.tab3Info.slice(this.state.tab3Info.length - showCount,);
        for (let i = 0; i < tabInfo.length; i++) {
            xAxisData.push(tabInfo[i].name);
            if (i !== tabInfo.length - 1) {
                seriesData.push(tabInfo[i].value);
            } else {
                seriesData.push({
                    value: tabInfo[i].value,
                    label: {
                        color: '#108ee9',
                        fontWeight: 'bold',
                        fontSize: 16
                    }
                });
            }
        }
        let xAxis = {
            inverse: isHorizontal,
            type: 'category',
            data: xAxisData,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
                alignWithLabel: true,
            },
            axisLabel: {
                rotate: isHorizontal ? -90 : 0,
                color: '#000',
                fontStyle: 'normal',
                // fontWeight:'bold',
                fontFamily: "'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei'",
                fontSize: 15,
                interval: 0,
            },
            // splitLine: {
            //     show: true,
            //     interval:0,
            // },
        };
        let yAxis = {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
        };

        let chart3 = echarts.init(document.getElementById(isHorizontal ? 'chart3-all' : 'chart3'), 'light');
        chart3.setOption({
            grid: {
                left: isHorizontal ? '10%' : 0,
                right: isHorizontal ? '10%' : 20,
                top: isHorizontal ? 0 : 60,
                bottom: isHorizontal ? 60 : 60,
            },
            xAxis: isHorizontal ? yAxis : xAxis,
            yAxis: isHorizontal ? xAxis : yAxis,
            series: [{
                silent: true,
                symbol: 'circle',
                symbolSize: function (value, params) {
                    if (params.dataIndex === 5 - 1) {
                        return 12;
                    } else {
                        return 8;
                    }
                },
                data: seriesData,
                type: 'line',
                label: {
                    position: isHorizontal ? 'right' : 'top',
                    rotate: isHorizontal ? -90 : 0,
                    offset: isHorizontal ? [0, -20] : [0, 0],
                    show: true,
                    color: 'grey',
                },
                itemStyle: {
                    color: '#108ee9'
                },
            }]
        });
    }

    renderTab1Info() {
        let tabInfo = this.state.tab1Info;
        if (tabInfo.length === 0) {
            return (
                <div className="rankTitle">暂无数据</div>
            )
        }
        let tabList = [];
        for (let i = 0; i < tabInfo.length; i++) {
            if (i === 5) {
                // 只显示前五名
                break;
            }
            let img;
            switch (i) {
                case 0:
                    img = medal_1;
                    break;
                case 1:
                    img = medal_2;
                    break;
                case 2:
                    img = medal_3;
                    break;
                default:
                    img = medal_other;
            }

            tabList.push(
                <div className="rankItem" key={'rank' + i}>
                    <div className="rankLabel">
                        <img src={img} alt={tabInfo[i].name} className="rankMedal"/>
                        {tabInfo[i].name}
                    </div>
                    <div className="value">{this.toThousands(tabInfo[i].value)}</div>
                </div>
            )
        }

        return (
            <div>
                <div className="rankTitle">政策分类前五</div>
                {tabList}
                <div className="rankTitle">政策分类最少</div>
                <div className="rankItem">
                    <div className="rankLabel">
                        <img src={medal_other} alt={tabInfo[tabInfo.length - 1].name} className="rankMedal"/>
                        {tabInfo[tabInfo.length - 1].name}
                    </div>
                    <div className="value">{tabInfo[tabInfo.length - 1].value}</div>
                </div>
            </div>
        )
    }

    renderTab2Info() {
        let firstInfo = this.state.tab2Info.first;
        let lastInfo = this.state.tab2Info.last;
        let detailInfo = this.state.tab2Info.detail;
        if (detailInfo.length === 0) {
            return (
                <div>
                    <div className="chartDiv"></div>
                    <div className="rankTitle">暂无数据</div>
                </div>
            )
        }
        let detailList = [];
        for (let i = 0; i < detailInfo.length; i++) {
            detailList.push(
                <div className="rankItem" key={'detail' + i}>
                    <div className="tab2_label">{detailInfo[i].name}</div>
                    <div className="value">{this.toThousands(detailInfo[i].value)}</div>
                </div>
            )
        }
        return (
            <div>
                <div className="rankTitle">本月门店最高</div>
                <div className="rankItem">
                    <div className="tab2_label">{firstInfo.name}</div>
                    <div className="value">{this.toThousands(firstInfo.value)}</div>
                </div>
                <div className="rankTitle">本月门店最少</div>
                <div className="rankItem">
                    <div className="tab2_label">{lastInfo.name}</div>
                    <div className="value">{this.toThousands(lastInfo.value)}</div>
                </div>
                <div className="rankTitle">本月门店明细</div>
                {detailList}
            </div>
        )
    }

    handleChangeDate(date) {
        this.setState({
            commCycle: date,
            animating: true,
        });
        let year = date.getFullYear();
        let month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
        let url = 'queryH5Detail.json?commCycle=' + year + month + '&loginName=' + window.loginName;

        // fetch(url)
        //     .then((res) => {
        //         return res.json()
        //     })
        //     .then((resJson) => {
        //         this.setState({
        //             amount: resJson.amount, //本月佣金
        //             amountYear: resJson.amountYear, //本年佣金
        //             tab1Info: resJson.policyList,
        //             tab2Info: resJson.detailList,
        //             tab3Info: resJson.yearList,
        //             animating: false,
        //         });
        //         // 绘制图表
        //         this.renderCharts()
        //     })
        //     .catch(e => {
        //         console.log(e);
        //         this.setState({
        //             animating: false,
        //         })
        //     });

        setTimeout(() => {
            this.setState({
                animating: false,
                amount: test_api_1_out.amount,
                amountYear: test_api_1_out.amountYear,
                tab1Info: test_api_1_out.policyList,
                tab2Info: test_api_1_out.detailList,
                tab3Info: test_api_1_out.yearList,
            });
            // 绘制图表
            this.renderCharts()
        }, 2000)
    }

    /**
     * 获取当前账期
     */
    getCurrentDate() {
        let date = new Date();
        if (date.getDate() < 25) {
            return new Date(date.getFullYear(), date.getMonth() - 2)
        } else {
            return new Date(date.getFullYear(), date.getMonth() - 1)
        }
    }

    showAll() {
        this.setState({
            isShowAll: !this.state.isShowAll,
        });
        setTimeout(() => this.renderCharts(), 500);

    }

    /**
     * 为数字加逗号
     * @param value
     * @returns {string}
     */
    toThousands(value) {
        let intNum = value, floatNum = '', result = '';
        if (value.indexOf(".") > -1) {
            intNum = value.split(".")[0];
            floatNum = value.split(".")[1];
        }
        while (intNum.length > 3) {
            result = ',' + intNum.slice(-3) + result;
            intNum = intNum.slice(0, intNum.length - 3);
        }
        if (intNum) {
            result = intNum + result;
        }
        if (value.indexOf(".") > -1) {
            result = result + '.' + floatNum;
        }
        return result;
    }
}
