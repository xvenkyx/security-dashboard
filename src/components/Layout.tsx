import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import type { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Security Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Box my={4}>{children}</Box>
      </Container>
    </>
  )
}

export default Layout
