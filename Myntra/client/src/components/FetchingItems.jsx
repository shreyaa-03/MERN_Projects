import React from 'react'
import { useSelector } from 'react-redux'

export default function FetchingItems() {
  const fetchStatus =   useSelector(store => store.loader)
  return (
    <div>
          Fetch Status: {fetchStatus.fetchDone}
          Currently Fetching : {fetchStatus.currentlyFetching}
    </div>
  )
}
