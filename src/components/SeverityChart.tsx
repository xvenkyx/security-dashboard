import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { Typography, Paper } from '@mui/material'

interface Props {
  data: any[]
}

const COLORS = ['#d32f2f', '#fbc02d', '#388e3c', '#1976d2', '#7b1fa2'] // red, yellow, green, blue, purple

const SeverityChart = ({ data }: Props) => {
  const severityCounts: Record<string, number> = {}

  data.forEach((item) => {
    const key = item.severity || 'unknown'
    severityCounts[key] = (severityCounts[key] || 0) + 1
  })

  const chartData = Object.entries(severityCounts).map(([key, value]) => ({
    name: key,
    value,
  }))

  return (
    <Paper sx={{ padding: 2, height: 350 }}>
      <Typography variant="h6" gutterBottom>
        Severity Distribution
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

export default SeverityChart
