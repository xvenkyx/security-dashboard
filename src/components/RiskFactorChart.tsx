import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from 'recharts'
  import { Typography, Paper } from '@mui/material'
  
  interface Props {
    data: any[]
  }
  
  const RiskFactorChart = ({ data }: Props) => {
    const riskFactorCount: Record<string, number> = {}
  
    data.forEach((item) => {
      const riskFactors = item.riskFactors || item.riskFactors?.[0] || {}
      Object.keys(riskFactors).forEach((factor) => {
        riskFactorCount[factor] = (riskFactorCount[factor] || 0) + 1
      })
    })
  
    const chartData = Object.entries(riskFactorCount).map(([key, value]) => ({
      name: key,
      count: value,
    }))
  
    return (
      <Paper sx={{ padding: 2, height: 400 }}>
        <Typography variant="h6" gutterBottom>
          Risk Factor Frequency
        </Typography>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    )
  }
  
  export default RiskFactorChart
  