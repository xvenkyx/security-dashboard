import {
  Button,
  Stack,
  Chip,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

interface Props {
  activeFilters: string[];
  onToggleFilter: (status: string) => void;
  onClearFilters: () => void;
  severity: string;
  onSeverityChange: (val: string) => void;
  search: string;
  onSearchChange: (val: string) => void;
}

const FilterBar = ({
  activeFilters,
  onToggleFilter,
  onClearFilters,
  severity,
  onSeverityChange,
  search,
  onSearchChange,
}: Props) => {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: "wrap" }}>
      <Button
        variant={
          activeFilters.includes("invalid - norisk") ? "contained" : "outlined"
        }
        color="primary"
        onClick={() => onToggleFilter("invalid - norisk")}
      >
        Analysis
      </Button>

      <Button
        variant={
          activeFilters.includes("ai-invalid-norisk") ? "contained" : "outlined"
        }
        color="secondary"
        onClick={() => onToggleFilter("ai-invalid-norisk")}
      >
        AI Analysis
      </Button>

      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel>Severity</InputLabel>
        <Select
          value={severity}
          label="Severity"
          onChange={(e) => onSeverityChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="unknown">Unknown</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Search CVE / Package"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {activeFilters.length > 0 || severity || search ? (
        <Chip label="Clear Filters" onDelete={onClearFilters} color="default" />
      ) : null}
    </Stack>
  );
};

export default FilterBar;
