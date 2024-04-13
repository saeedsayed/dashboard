import React from 'react'
import { PageHeader } from '../../components'
import { BarChart } from '@mui/x-charts'

import {lineChartData,lineChartYKey } from '../../data/dummy'

const Bar = () => {
  return (
    <>
    <PageHeader title={'barChart'} subTitle={'simple bar chart'} />
    <div className="w-full overflow-auto h-full [&_tspan]:fill-primary-text [&_line]:!stroke-primary [&>*]:m-auto">
    <BarChart
      dataset={lineChartData}
      xAxis={[{ scaleType: 'band', dataKey: 'year', scaleType:'band' }]}
      series={Object.keys(lineChartYKey).map(key =>({ dataKey: key, label: key,color: lineChartYKey[key]}))}
      width={1100}
    />
    </div>
    </>
  )
}

export default Bar