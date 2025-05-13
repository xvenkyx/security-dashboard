import { CircularProgress, Typography, Stack } from '@mui/material'
import Layout from '../components/Layout'
import VulnerabilityTable from '../components/VulnerabilityTable'
import FilterBar from '../components/FilterBar'
import { useWorkerLoader } from '../hooks/useWorkerLoader'
import { filterByKaiStatus } from '../utils/vulnerabilityUtils'
import { useMemo, useState } from 'react'
import SeverityChart from '../components/SeverityChart'
import RiskFactorChart from '../components/RiskFactorChart'
import TrendChart from '../components/TrendChart'
import AnalysisComparisonChart from '../components/AnalysisComparisonChart'
import ComparisonView from '../components/ComparisonView'
import ExportButtons from '../components/ExportButtons'

const Dashboard = () => {
  // Load vulnerabilities from Web Worker
  const { data, loading, error } = useWorkerLoader('/ui_demo.json')

  // Filters: "invalid - norisk", "ai-invalid-norisk"
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const [selectedVulns, setSelectedVulns] = useState<any[]>([])

  const handleToggleFilter = (status: string) => {
    setActiveFilters((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    )
  }

  const handleClearFilters = () => {
    setActiveFilters([])
  }

  // Apply filters
  const filteredData = useMemo(() => {
    if (!data) return []
    return filterByKaiStatus(data, activeFilters)
  }, [data, activeFilters])

  return (
    <Layout>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          Security Vulnerability Dashboard
        </Typography>

        <SeverityChart data={filteredData} />
        <RiskFactorChart data={filteredData} />
        <TrendChart data={filteredData} />
        <AnalysisComparisonChart data={filteredData} />


        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Error loading data: {error}</Typography>
        ) : (
          <>
            <Typography variant="body1">
              Total Vulnerabilities: {filteredData.length}
            </Typography>

            <FilterBar
              activeFilters={activeFilters}
              onToggleFilter={handleToggleFilter}
              onClearFilters={handleClearFilters}
            />

            <ExportButtons data={filteredData} />
            <VulnerabilityTable vulnerabilities={filteredData} onSelect={setSelectedVulns} />
            <ComparisonView items={selectedVulns} />
          </>
        )}
      </Stack>
    </Layout>
  )
}

export default Dashboard
