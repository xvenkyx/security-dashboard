import { useEffect, useState } from 'react'

export interface Filters {
  kaiStatus: string[]
  severity: string
  search: string
}

export const useWorkerLoader = (url: string, filters: Filters) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let worker: Worker | null = new Worker(
      new URL('../workers/dataWorker.ts', import.meta.url),
      { type: 'module' }
    )

    setLoading(true)

    worker.postMessage({ url, filters })

    worker.onmessage = (e) => {
      if (e.data.success) {
        setData(e.data.data)
        setError(null)
      } else {
        setError(e.data.error || 'Unknown error')
      }
      setLoading(false)
    }

    worker.onerror = (err) => {
      setError(err.message)
      setLoading(false)
    }

    return () => {
      if (worker) {
        worker.terminate()
        worker = null
      }
    }
  }, [url, filters]) // ✅ filters must be memoized in Dashboard

  return { data, loading, error }
}
