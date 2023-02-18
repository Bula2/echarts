const data = [
    {period: "Март", name: "В программе ЦП", value: 120},
    {period: "Апрель", name: "В программе ЦП", value: 120},
    {period: "Май", name: "В программе ЦП", value: 120},
    {period: "Июнь", name: "В программе ЦП", value: 120},
    {period: "Июль", name: "В программе ЦП", value: 120},
    {period: "Август", name: "В программе ЦП", value: 120},
    {period: "Сентябрь", name: "В программе ЦП", value: 120},
    {period: "Март", name: "В программе ИТ", value: 220},
    {period: "Апрель", name: "В программе ИТ", value: 182},
    {period: "Май", name: "В программе ИТ", value: 191},
    {period: "Июнь", name: "В программе ИТ", value: 234},
    {period: "Июль", name: "В программе ИТ", value: 290},
    {period: "Август", name: "В программе ИТ", value: 330},
    {period: "Сентябрь", name: "В программе ИТ", value: 310},
    {period: "Март", name: "Вне программ ЦП", value: 620},
    {period: "Апрель", name: "Вне программ ЦП", value: 732},
    {period: "Май", name: "Вне программ ЦП", value: 701},
    {period: "Июнь", name: "Вне программ ЦП", value: 734},
    {period: "Июль", name: "Вне программ ЦП", value: 1090},
    {period: "Август", name: "Вне программ ЦП", value: 1130},
    {period: "Сентябрь", name: "Вне программ ЦП", value: 1120},
    {period: "Март", name: "Вне программ ИТ", value: 120},
    {period: "Апрель", name: "Вне программ ИТ", value: 132},
    {period: "Май", name: "Вне программ ИТ", value: 101},
    {period: "Июнь", name: "Вне программ ИТ", value: 134},
    {period: "Июль", name: "Вне программ ИТ", value: 290},
    {period: "Август", name: "Вне программ ИТ", value: 230},
    {period: "Сентябрь", name: "Вне программ ИТ", value: 220}
];
const chartDom = document.getElementById('main');
const myChart = echarts.init(chartDom);
let option;


option = {
    title: {
        text: 'Проекты в программах и вне программ',
        subtext: "Сумма и процентное соотношение проектов, находящихся в программах и вне программ"
    },
    toolbox: {
        show: true,
        right: 45,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        textStyle: {
            fontWeight: 700,
            color: "#002033",
            fontSize: 12,
            lineHeight: 17
        },
        formatter: (params) => {
            const allCount = params.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
            const inProgramIT = params.filter(it => it.seriesName === "В программе ИТ").reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
            const inProgramCP = params.filter(it => it.seriesName === "В программе ЦП").reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
            const outProgramIT = params.filter(it => it.seriesName === "Вне программ ИТ").reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
            const outProgramCP = params.filter(it => it.seriesName === "Вне программ ЦП").reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
            const colors = params.map(it => it.color)
            const inProgramCount = inProgramIT + inProgramCP;
            const inProgramPercent = Math.round(inProgramCount / allCount * 100);
            const outProgramCount = outProgramIT + outProgramCP;
            const outProgramPercent = Math.round(outProgramCount / allCount * 100);
            const projectIT = "Проекты ИТ";
            const projectCP = "Проекты ЦП";
            return `
                <style>
                  .color0 {background-color: #0078D2}
                  .color1 {background-color: #56B9F2}
                  .color2 {background-color: #00724C}
                  .color3 {background-color: #22C38E}
                </style>
                <div class="tooltip">
                    <div class="title">${params[0].axisValue} 2022</div>
                     <div class="item">
                          <div class="item_title">В программе</div><div>${inProgramPercent}% | ${inProgramCount} шт.</div>
                    </div>
                    <div class="item">
                        <div class="item_el"><div class="round color0"></div>&nbsp;${projectIT}</div>
                        <div class="info">${inProgramIT} шт.</div>
                    </div>
                     <div class="item">
                        <div class="item_el"><div class="round color1"></div>&nbsp;${projectCP}</div>
                        <div class="info">${inProgramCP} шт.</div>
                    </div>
                    <div class="item">
                        <div class="item_title">Вне программы</div>
                        <div>${outProgramPercent}% | ${outProgramCount} шт.</div>
                    </div>
                    <div class="item">
                        <div class="item_el"><div class="round color2"></div>&nbsp;${projectIT}</div>
                        <div class="info">${outProgramIT} шт.</div>
                    </div>
                     <div class="item">
                        <div class="item_el"><div class="round color3"></div>&nbsp;${projectCP}</div>
                        <div class="info">${outProgramCP} шт.</div>
                    </div>
                </div>
                `;
        },
    },
    legend: {
        bottom: '0',
        itemGap: 20,
        icon: "circle"
    },
    grid: {
        left: '0',
        right: '4%',
        bottom: '40px',
        top: "90px",
        containLabel: true
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    xAxis: {
        type: 'category',
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        data: ['Март', "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь"]
    },
    series: [
        {
            name: 'В программе ИТ',
            type: 'bar',
            stack: 'one',
            color: "#0078D2",
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    fontWeight: 700
                }
            },
            data: data.filter(it => it.name === "В программе ИТ").map(it => it.value),
        },
        {
            name: 'В программе ЦП',
            type: 'bar',
            stack: 'one',
            color: "#56B9F2",
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    fontWeight: 700
                },
            },
            data: data.filter(it => it.name === "В программе ЦП").map(it => it.value)
        },
        {
            name: 'Вне программ ЦП',
            type: 'bar',
            stack: 'two',
            color: "#22C38E",
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    fontWeight: 700
                },
            },
            data: data.filter(it => it.name === "Вне программ ЦП").map(it => it.value)
        },
        {
            name: 'Вне программ ИТ',
            type: 'bar',
            stack: 'two',
            color: "#00724C",
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    fontWeight: 700
                },
            },
            data: data.filter(it => it.name === "Вне программ ИТ").map(it => it.value)
        }
    ]
};

option && myChart.setOption(option);
