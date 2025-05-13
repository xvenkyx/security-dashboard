import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Box,
} from '@mui/material'
import { memo } from 'react'

const ComparisonView = memo(({ items }: { items: any[] }) => {
  if (items.length < 2) return null

  const fields = ['cve', 'severity', 'cvss', 'packageName', 'packageVersion', 'fixDate']

  return (
    <Paper sx={{ p: 2, my: 3, overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Vulnerability Comparison
      </Typography>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Table
          sx={{
            minWidth: 800,
            borderCollapse: 'separate',
            borderSpacing: 0,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  position: 'sticky',
                  left: 0,
                  zIndex: 2,
                  backgroundColor: '#fff',
                  fontWeight: 'bold',
                  borderRight: '1px solid #ddd',
                }}
              >
                Field
              </TableCell>
              {items.map((_, idx) => (
                <TableCell
                  key={idx}
                  align="center"
                  sx={{ minWidth: 150, backgroundColor: '#f9f9f9' }}
                >
                  Vuln {idx + 1}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {fields.map((field) => (
              <TableRow key={field}>
                <TableCell
                  sx={{
                    position: 'sticky',
                    left: 0,
                    backgroundColor: '#fff',
                    fontWeight: 500,
                    borderRight: '1px solid #ddd',
                    zIndex: 1,
                  }}
                >
                  {field}
                </TableCell>
                {items.map((item, idx) => (
                  <TableCell key={idx} align="center">
                    {item[field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  )
})

export default ComparisonView
