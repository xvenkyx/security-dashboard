import { CircularProgress, Typography, Stack, Box } from "@mui/material";
import { useState, useMemo, useEffect, Suspense, lazy } from "react";
import Layout from "../components/Layout";
import VulnerabilityTable from "../components/VulnerabilityTable";
import FilterBar from "../components/FilterBar";
import ExportButtons from "../components/ExportButtons";
import ComparisonView from "../components/ComparisonView";
import { useDebounce } from "use-debounce";
import { useWorkerLoader } from "../hooks/useWorkerLoader";

// Lazy load chart components
const SeverityChart = lazy(() => import("../components/SeverityChart"));
const RiskFactorChart = lazy(() => import("../components/RiskFactorChart"));
const TrendChart = lazy(() => import("../components/TrendChart"));
const AnalysisComparisonChart = lazy(
  () => import("../components/AnalysisComparisonChart")
);

const Dashboard = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [search, setSearch] = useState("");
  const [selectedVulns, setSelectedVulns] = useState<any[]>([]);
  const [showCharts, setShowCharts] = useState(false);

  const [debouncedSearch] = useDebounce(search, 300);

  const filters = useMemo(
    () => ({
      kaiStatus: activeFilters,
      severity,
      search: debouncedSearch,
    }),
    [activeFilters, severity, debouncedSearch]
  );

  const {
    data: filteredData,
    loading,
    error,
  } = useWorkerLoader("/ui_demo.json", filters);

  useEffect(() => {
    const timer = setTimeout(() => setShowCharts(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleFilter = (status: string) => {
    setActiveFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setSeverity("");
    setSearch("");
  };

  return (
    <Layout>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          Security Vulnerability Dashboard
        </Typography>

        <FilterBar
          activeFilters={activeFilters}
          onToggleFilter={handleToggleFilter}
          onClearFilters={handleClearFilters}
          severity={severity}
          onSeverityChange={setSeverity}
          search={search}
          onSearchChange={setSearch}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Error loading data: {error}</Typography>
        ) : (
          <>
            {/* Compact Metrics Row */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
            >
              <Typography variant="body1" sx={{ flex: 1 }}>
                Total Vulnerabilities: {filteredData.length}
              </Typography>
              <ExportButtons data={filteredData} />
            </Box>

            {/* Charts Section */}
            {showCharts && (
              <Stack spacing={2}>
                {/* First Row */}
                <Box display="flex" flexWrap="wrap" gap={2}>
                  <Suspense fallback={<div>Loading severity chart...</div>}>
                    <Box flex={1} minWidth={350}>
                      <SeverityChart data={filteredData} />
                    </Box>
                  </Suspense>

                  <Suspense fallback={<div>Loading risk factors chart...</div>}>
                    <Box flex={1} minWidth={350}>
                      <RiskFactorChart data={filteredData} />
                    </Box>
                  </Suspense>
                </Box>

                {/* Second Row */}
                <Box display="flex" flexWrap="wrap" gap={2}>
                  <Suspense fallback={<div>Loading trend chart...</div>}>
                    <Box flex={1} minWidth={350}>
                      <TrendChart data={filteredData} />
                    </Box>
                  </Suspense>

                  <Suspense
                    fallback={<div>Loading AI/manual comparison chart...</div>}
                  >
                    <Box flex={1} minWidth={350}>
                      <AnalysisComparisonChart data={filteredData} />
                    </Box>
                  </Suspense>
                </Box>
              </Stack>
            )}

            {/* Table + Comparison */}
            <VulnerabilityTable
              vulnerabilities={filteredData}
              onSelect={setSelectedVulns}
            />
            <ComparisonView items={selectedVulns} />
          </>
        )}
      </Stack>
    </Layout>
  );
};

export default Dashboard;
