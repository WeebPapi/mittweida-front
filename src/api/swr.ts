export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  })

  if (!res.ok) {
    const errorBody = await res.json()
    const error = new Error(errorBody.message || "An API error occurred")

    // @ts-ignore
    error.info = errorBody
    // @ts-ignore
    error.status = res.status

    throw error
  }

  return res.json()
}
