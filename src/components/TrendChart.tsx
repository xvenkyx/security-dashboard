import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
  } from 'recharts'
  import { Typography, Paper } from '@mui/material'
  import { parseISO, format } from 'date-fns'
  
  interface Props {
    data: any[]
  }
  
  const TrendChart = ({ data }: Props) => {
    const monthMap: Record<string, number> = {}
  
    data.forEach((item) => {
      const dateStr = item.fixDate || item.published || ''
      const parsedDate = parseISO(dateStr)
      if (!isNaN(parsedDate as any)) {
        const key = format(parsedDate, 'yyyy-MM')
        monthMap[key] = (monthMap[key] || 0) + 1
      }
    })
  
    const chartData = Object.entries(monthMap)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month))
  
    return (
      <Paper sx={{ padding: 2, height: 400 }}>
        <Typography variant="h6" gutterBottom>
          Trend of Vulnerabilities Over Time
        </Typography>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#1976d2" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    )
  }
  
  export default TrendChart
  