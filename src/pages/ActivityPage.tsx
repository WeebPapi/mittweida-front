import type { Activity } from "@/api/db.types"
import { fetcher } from "@/api/swr"
import { useNavigate, useParams } from "react-router"
import useSWR from "swr"

const ActivityPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useSWR<Activity>(
    `/activities/${id}`,
    fetcher
  )

  if (error) return null
  else if (isLoading) return <p>Loading...</p>
  else if (data)
    return (
      <main>
        <div>
          <h1 className="text-2xl font-semibold py-4">{data.name}</h1>
          {data.videoUrl ? (
            <video className="w-full object-cover" src={data.videoUrl} />
          ) : (
            <img
              className="w-full object-cover"
              src={
                data.imageUrl ? data.imageUrl : "https://placehold.co/300x200"
              }
            />
          )}
        </div>
        <div className="flex flex-col pt-6">
          <div className="pb-3 border-b-gray-200 border-b-2 flex justify-between">
            <p className="font-medium">Category:</p>
            <p>{data.category}</p>
          </div>
        </div>
      </main>
    )
}

export default ActivityPage
