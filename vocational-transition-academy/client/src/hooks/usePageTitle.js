import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | Udaan Academy`
  }, [title])
}