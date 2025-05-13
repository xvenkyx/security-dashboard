import { Button, Stack, Chip } from '@mui/material'

interface Props {
  activeFilters: string[]
  onToggleFilter: (status: string) => void
  onClearFilters: () => void
}

const FilterBar = ({ activeFilters, onToggleFilter, onClearFilters }: Props) => {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <Button
        variant={activeFilters.includes('invalid - norisk') ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onToggleFilter('invalid - norisk')}
      >
        Analysis
      </Button>

      <Button
        variant={activeFilters.includes('ai-invalid-norisk') ? 'contained' : 'outlined'}
        color="secondary"
        onClick={() => onToggleFilter('ai-invalid-norisk')}
      >
        AI Analysis
      </Button>

      {activeFilters.length > 0 && (
        <Chip label="Clear Filters" onDelete={onClearFilters} color="default" />
      )}
    </Stack>
  )
}

export default FilterBar
