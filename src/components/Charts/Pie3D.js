// STEP 1 - Include Dependencies
// Include react
import React from 'react'
import ReactDOM from 'react-dom'

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts'

// Include the fusioncharts library
import FusionCharts from 'fusioncharts'

// Include the chart type
import Chart from 'fusioncharts/fusioncharts.charts'

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)
const Pie3D = ({ data }) => {
  // Adding the chart and theme as dependency to the core fusioncharts

  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: 'pie3d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Languages',
        decimals: 0,
        pieradius: '45%',

        //Set the theme for your chart
        theme: 'fusion',
      },
      // Chart Data
      data,
    },
  }

  // STEP 4 - Creating the DOM element to pass the react-fusioncharts component

  return <ReactFC {...chartConfigs} />
}
export default Pie3D
