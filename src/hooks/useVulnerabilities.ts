import { useQuery } from '@tanstack/react-query'

export interface Vulnerability {
  cve: string
  severity: string
  cvss: number
  description: string
  packageName: string
  packageVersion: string
  fixDate: string
  link: string
  [key: string]: any
}

export const useVulnerabilities = () => {
  return useQuery<Vulnerability[]>({
    queryKey: ['vulnerabilities'],
    queryFn: async () => {
      const proxyUrl = 'https://api.allorigins.win/raw?url='
      const targetUrl =
        'https://raw.githubusercontent.com/chanduusc/Ui-Demo-Data/main/ui_demo.json'

      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl))
      const json = await response.json()

      const vulnerabilities: Vulnerability[] = []

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

      console.log('Extracted vulnerabilities:', vulnerabilities)
      return vulnerabilities
    },
  })
}
