import { Typography, Paper, Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material'

const ComparisonView = ({ items }: { items: any[] }) => {
  if (items.length < 2) return null

  return (
    <Paper sx={{ padding: 2, my: 3 }}>
      <Typography variant="h6">Vulnerability Comparison</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            {items.map((_, idx) => (
              <TableCell key={idx}>Vuln {idx + 1}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {['cve', 'severity', 'cvss', 'packageName', 'packageVersion', 'fixDate'].map((field) => (
            <TableRow key={field}>
              <TableCell>{field}</TableCell>
              {items.map((item, idx) => (
                <TableCell key={idx}>{item[field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default ComparisonView
