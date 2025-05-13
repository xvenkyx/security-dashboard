import { useEffect, useState } from 'react'

export const useWorkerLoader = (url: string) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const worker = new Worker(new URL('../workers/dataWorker.ts', import.meta.url), {
      type: 'module'
    })

    worker.postMessage(url)

    worker.onmessage = (e) => {
      if (e.data.success) {
        setData(e.data.data)
      } else {
        setError(e.data.error)
      }
      setLoading(false)
    }

    return () => {
      worker.terminate()
    }
  }, [url])

  return { data, loading, error }
}
