import useSWR from "swr"
import { fetcher } from "./api/swr"

function App() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/users/1c3f6e73-c960-4250-b749-1b97709d4f61",
    fetcher
  )
  if (!error && !isLoading)
    return (
      <>
        <p className="font-open">{data.email}</p>
      </>
    )
}

export default App
