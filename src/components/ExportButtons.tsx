import { Button, Stack } from '@mui/material'
import { saveAs } from 'file-saver'

interface Props {
  data: any[]
}

const ExportButtons = ({ data }: Props) => {
  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    saveAs(blob, 'vulnerabilities.json')
  }

  const handleExportCSV = () => {
    if (!data.length) return

    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(','), // header row
      ...data.map((row) =>
        headers.map((field) => JSON.stringify(row[field] ?? '')).join(',')
      ),
    ]

    const csvContent = csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'vulnerabilities.csv')
  }

  return (
    <Stack direction="row" spacing={2} sx={{ my: 2 }}>
      <Button variant="outlined" onClick={handleExportJSON}>
        Export JSON
      </Button>
      <Button variant="outlined" onClick={handleExportCSV}>
        Export CSV
      </Button>
    </Stack>
  )
}

export default ExportButtons
