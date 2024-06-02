import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ cTitle, xData, sData, style = { width: '500px', height: '400px' } }) => {
  const chartRef = useRef(null)
  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: cTitle
      },
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: sData,
          type: 'bar'
        }
      ]
    };
    option && myChart.setOption(option);
  }, [cTitle, xData, sData])
  return <div style={{ margin: '10px'}}><div ref={chartRef} style={style}></div></div>
}

export default BarChart