import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts'
  import { Typography, Paper } from '@mui/material'
  
  interface Props {
    data: any[]
  }
  
  const COLORS = ['#0288d1', '#f57c00', '#43a047'] // AI, Manual, Remaining
  
  const AnalysisComparisonChart = ({ data }: Props) => {
    let aiCount = 0
    let manualCount = 0
    let remaining = 0
  
    data.forEach((item) => {
      const status = item.kaiStatus
      if (status === 'ai-invalid-norisk') {
        aiCount++
      } else if (status === 'invalid - norisk') {
        manualCount++
      } else {
        remaining++
      }
    })
  
    const chartData = [
      { name: 'AI Dismissed', value: aiCount },
      { name: 'Manual Dismissed', value: manualCount },
      { name: 'Remaining', value: remaining }
    ]
  
    return (
      <Paper sx={{ padding: 2, height: 400 }}>
        <Typography variant="h6" gutterBottom>
          AI vs Manual Analysis Comparison
        </Typography>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    )
  }
  
  export default AnalysisComparisonChart
  