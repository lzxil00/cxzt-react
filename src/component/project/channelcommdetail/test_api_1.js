/**
 * Created by lzxil on 2018/7/29.
 */
// 入参
let test_api_1_input = "?commCycle=201806&loginName=123456";

// 回参
const test_api_1_out = {
    amount: '1234577.13',      //本月佣金
    amountYear: '36212377.3', //本年佣金
    policyList: [            //按政策分类佣金列表
        {name: '店奖', value: '9088.13'},
        {name: '常规佣金', value: '1230.43'},
        {name: '达量奖励', value: '2340.13'},
        {name: 'XX佣金', value: '3450.13'},
        {name: '其他', value: '4560.13'},
        {name: '其他1', value: '1230.12'},
        {name: '达收奖励', value: '2340.13'},
        {name: '末梢店奖', value: '188.00'},
    ],
    detailList: {            //本月门店佣金
        first: {name: '门店2', value: '12488.13'},   //本月佣金最高
        last: {name: '门店3', value: '188.00'},      //本月佣金最少
        detail: [           //本月佣金明细 按门店名字（或id）排列（不要使用佣金高低value）
            {name: '门店4', value: '12488.13'},
            {name: '门店2门店2门店2', value: '1485.43'},
            {name: 'XX合作厅', value: '1288.13'},
            {name: '门店4', value: '1258.13'},
            {name: '门店5', value: '1128.13'},
        ],
    },
    yearList: [              //本年佣金
        {name: '1月', value: '42345.24'},
        {name: '2月', value: '22123.45'},
        {name: '3月', value: '32123.42'},
        {name: '4月', value: '17123.35'},
        {name: '5月', value: '57123.35'},
        {name: '6月', value: '37123.35'},
        {name: '7月', value: '67123.35'},
        {name: '8月', value: '57123.35'},
        {name: '9月', value: '87123.35'},
        {name: '10月', value: '77123.35'},
    ],
};
export default test_api_1_out;