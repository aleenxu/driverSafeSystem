
window.onload = function () {
    var shebei = echarts.init(document.getElementById('shebei'))
    var pilao = echarts.init(document.getElementById('pilao'))
    var cheliang = echarts.init(document.getElementById('cheliang'))
    var renyuan = echarts.init(document.getElementById('renyuan'))
    //指定图标的配置和数据
    var cheLiang = [200, 500, 900];
    var zhu = {//设备状态统计柱状图 
     
        tooltip: {
            show: true,
            trigger: 'axis',
            formatter: function (params) {
                var relVal = params[0].name;
                for (var i = 0, l = params.length; i < l; i++) {
                    relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value + "辆";
                }
                return relVal;
            },
            axisPointer: {//去除提示指示线
                type: 'none'
            }
        },

        legend: {
            data: ['用户来源']
        },

        xAxis: {
            "axisLine": {   //x轴
                "show": false  //隐藏x轴

            },
            "axisTick": {       //y轴刻度线
                "show": false
            },
            axisLabel: {//柱状图底部文字设置
                color: '#fff',
                fontSize: 12
            },


            data: ["异常", "离线", "正常"]
        },
        yAxis: {


            show: false,

            "axisLine": {       //y轴
                "show": false   //隐藏y轴

            },

            "axisTick": {       //y轴刻度线
                "show": false
            },
            "splitLine": {     //网格线
                "show": false
            }
        },
        series: [
            {
                name: '车辆数量',
                type: 'bar',
                barWidth: 50,//柱状图的宽度 默认单位是px
                data: [200, 500, 900],
                // barGap:'50%',
                barCategoryGap: '5%',


                itemStyle: {
                    normal: {    //设置颜色的渐变
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [

                                { offset: 0, color: '#87ffd0' },
                                { offset: 1, color: '#01f998' }
                            ]
                        )

                    }
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#01f998' },
                            { offset: 1, color: '#87ffd0' }
                        ]
                    )
                },

                data:cheLiang,
                label: {                 //添加柱状图顶部数字
                    normal: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 12,
                        },
                        show: true,
                        position:[10,-15],
                        formatter: function(obj) { //添加数据单位
                           return obj.value + '辆';
                            }
                    },
                }
            }],
        grid: {
            top: '5%'
        }
    };


var renYuan = [200, 500, 900];
    var zhu1 = {//人员在线统计柱状图
        tooltip: {
            show: true,
            trigger: 'axis',
            formatter: function (params) {
                var relVal = params[0].name;
                for (var i = 0, l = params.length; i < l; i++) {
                    relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value + "个";
                }
                return relVal;
            },
            axisPointer: {//去除提示指示线
                type: 'none'
            }
        },

        legend: {
            data: ['用户来源']
        },

        xAxis: {


            "axisLine": {   //x轴
                "show": false  //隐藏x轴

            },
            "axisTick": {       //y轴刻度线
                "show": false
            },
            axisLabel: {//柱状图底部文字设置
                color: '#fff',
                fontSize: 12
            },

            data: ["异常", "离线", "正常"]
        },
        yAxis: {
            show: false,

            "axisLine": {       //y轴
                "show": false   //隐藏y轴

            },

            "axisTick": {       //y轴刻度线
                "show": false
            },
            "splitLine": {     //网格线
                "show": false
            }
        },
        series: [
            {
                name: '手环数量',
                type: 'bar',
                barWidth: 50,//柱状图的宽度 默认单位是px
               
                // barGap:'50%',
                barCategoryGap: '5%',
                itemStyle: {
                    normal: {    //设置颜色的渐变
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [

                                { offset: 0, color: '#00b1ff' },
                                { offset: 1, color: '#006eff' }
                            ]
                        )

                    }
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#006eff' },
                            { offset: 1, color: '#00b1ff' }
                        ]
                    )
                },
                data: renYuan,
                label: {                 //添加柱状图顶部数字
                    normal: {
                        textStyle: {
                            color: '#fff',//数据单位文字颜色
                            fontSize: 12,
                        },
                        show: true,
                        position:[10,-15],
                        formatter: function(obj) {//添加数据单位
                           return obj.value + '个';
                            }
                    },
                }
            }],
        grid: {
            top: '5%'
        }
    };
    var bing1 = {//疲劳状态统计饼图
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}人"
        },

        legend: {
            textStyle: {
                color: '#fff',//控制图例文字颜色，字体大小
                fontSize: 12,
            },
            orient: 'vertical',
            show: true,
            right: '25', // 设置图例的位置 可以设置数值
            top: '120',
            data: ['疲劳', '轻度', '正常'],

            itemWidth: 24,             // 图例图形宽度
            itemHeight: 12,            // 图例图形高度
        },
        color: ['#f80087', '#fe8d3c', '#008aff'],//环图的颜色
        series: [

            {
                name: '人员状态',
                type: 'pie',
                clockWise: true,          // 默认逆时针
                radius: ['30%', '55%'],
                labelLine: {
                    normal: {
                        length: 15,
                        length2: 60,
                        lineStyle: {
                            color: '#0154c4'  //设置折现的颜色
                        }
                    }

                },
                label: {
                    normal: {
                        formatter: '{a|{d}%}\n{b|{c}人}',
                        borderWidth: 0,
                        borderRadius: 8,

                        padding: [0, -50],
                        rich: {
                            a: {
                                color: '#fff',
                                fontSize: 12,
                                lineHeight: 40
                            },

                            b: {

                                fontSize: 12,
                                lineHeight: 20,
                                color: '#fff'
                            },


                        }
                    }
                },
                data: [{
                    value: 50,
                    name: '疲劳'
                }, {
                    value: 300,
                    name: '轻度'
                }, {
                    value: 650,
                    name: '正常'
                }]
            }
        ]
    };


    var bing2 = {//车辆状态统计饼图
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}辆"
        },
        legend: {
            textStyle: {//图例文字大小及颜色
                color: '#fff',
                fontSize: 12,
            },
            orient: 'vertical',
            show: true,
            right: '0', // 设置图例的位置 可以设置数值
            top: '120',
            data: ['故障/异常', '停运', '正常'],

            itemWidth: 24,             // 图例图形宽度
            itemHeight: 12,            // 图例图形高度
        },
        color: ['#f8018b', '#3dff77', '#008aff'],//环图的颜色
        series: [

            {
                name: '车辆状态',
                type: 'pie',
                clockWise: true,          // 默认逆时针
                radius: ['30%', '55%'],
                labelLine: {
                    normal: {
                        length: 15,
                        length2: 60,
                        lineStyle: {
                            color: '#0154c4'  //设置折现的颜色
                        }
                    }

                },
                label: {
                    normal: {
                        formatter: '{a|{d}%}\n{b|{c}辆}',
                        borderWidth: 0,
                        borderRadius: 8,

                        padding: [0, -50],
                        rich: {
                            a: {
                                color: '#fff',
                                fontSize: 12,
                                lineHeight: 40
                            },
                            b: {

                                fontSize: 12,
                                lineHeight: 20,
                                color: '#fff'
                            },
                        }
                    }
                },
                data: [{
                    value: 50,
                    name: '故障/异常'
                }, {
                    value: 300,
                    name: '停运'
                }, {
                    value: 650,
                    name: '正常'
                }]
            }
        ]
    };
    shebei.setOption(zhu);
    renyuan.setOption(zhu1);
    pilao.setOption(bing1);
    cheliang.setOption(bing2);
}
