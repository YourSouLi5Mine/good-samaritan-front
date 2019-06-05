import React, { Component } from 'react'
import CanvasJSReact from '../canvasjs.react'
import axios from 'axios'
import { Row, Col } from 'antd'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];

class Dashboard extends Component {
  render() {
    const options = {
      theme: 'dark2',
      title: {
        text: "Api Data"
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    }

    return (
      <Row>
        <Col xs={{span: 14, offset: 5}} md={{span:16, offset: 4}}>
          <CanvasJSChart options = {options}
            onRef={ref => this.chart = ref}
          />
        </Col>
      </Row>
    );
  }

  componentDidMount(){
    var chart = this.chart;
    axios.get(`http://localhost:8000/api/v1/totals?${document.cookie}`)
    .then((res) => {
      for (const total in res.data) {
        let label = total.charAt(0).toUpperCase() + total.slice(1)
        dataPoints.push({
          label: label,
          y: res.data[total]
        })
      }
      chart.render()
    })
  }
}

export default Dashboard
