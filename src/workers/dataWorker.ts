/// <reference lib="webworker" />

interface WorkerMessage {
  url: string
  filters: {
    kaiStatus?: string[]
    severity?: string
    search?: string
  }
}

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { url, filters } = e.data

  try {
    const res = await fetch(url)
    const json = await res.json()

    const vulnerabilities: any[] = []
    const groups = json.groups || {}

    for (const groupKey in groups) {
      const repos = groups[groupKey].repos || {}
      for (const repoKey in repos) {
        const images = repos[repoKey].images || {}
        for (const imageKey in images) {
          const image = images[imageKey]
          const vulns = image.vulnerabilities || []
          vulnerabilities.push(...vulns)
        }
      }
    }

    const filtered = vulnerabilities.filter((vuln) => {
      const { kaiStatus = [], severity, search } = filters
      let keep = true

      if (kaiStatus.length) {
        keep = !kaiStatus.includes(vuln.kaiStatus)
      }

      if (keep && severity) {
        const s = (vuln.severity || 'unknown').toLowerCase()
        keep = s === severity.toLowerCase()
      }

      if (keep && search) {
        const term = search.toLowerCase()
        keep =
          vuln.cve?.toLowerCase().includes(term) ||
          vuln.packageName?.toLowerCase().includes(term)
      }

      return keep
    })

    postMessage({ success: true, data: filtered })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    postMessage({ success: false, error: message })
  }
}
