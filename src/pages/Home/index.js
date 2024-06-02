import BarChart from "@/components/BarChart";
import { Card } from "antd";

const Home = () => {
  const chart1 = {
    cTitle: '三大框架满意度',
    xData: ['Vue', 'React', 'Angular'],
    sData: [20, 40, 30]
  }
  const chart2 = {
    cTitle: '编程语言排行',
    xData: ['Python', 'C', 'C++', 'Java', 'C#', 'JavaScript'],
    sData: [16.33, 9.98, 9.53, 8.69, 6.49, 3.01]
  }
  return (
    <Card title='首页'>
      <div style={{ display: 'flex', margin: '20px'}}>
        <BarChart cTitle={chart1.cTitle} xData={chart1.xData} sData={chart1.sData}></BarChart>
        <BarChart cTitle={chart2.cTitle} xData={chart2.xData} sData={chart2.sData} style={{ width: '600px', height: '400px'}}></BarChart>
      </div>
    </Card>
    
  )
}

export default Home