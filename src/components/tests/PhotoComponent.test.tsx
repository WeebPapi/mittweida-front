import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import PhotoComponent from "../PhotoComponent"
import useSWR from "swr"

interface MockUser {
  profilePicture?: string
  firstName?: string
  lastName?: string
}

vi.mock("swr", () => ({
  default: vi.fn(() => ({
    data: undefined,
    isLoading: true,
    error: undefined,
  })),
}))

const mockUseSWR = useSWR as unknown as ReturnType<typeof vi.fn>

const defaultProps = {
  imgUrl: "https://example.com/main-photo.jpg",
  userId: "user123",
  caption: "A beautiful day!",
  location: "Mittweida, Germany",
}

describe("PhotoComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseSWR.mockReturnValue({
      data: {
        profilePicture: "https://example.com/profile.jpg",
        firstName: "John",
      } as MockUser,
      isLoading: false,
      error: undefined,
    })
  })

  it('renders "Loading..." when data is being fetched', () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    })

    render(<PhotoComponent {...defaultProps} />)
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("renders user details and photo when data is loaded", async () => {
    render(<PhotoComponent {...defaultProps} />)

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    })

    const profileImg = screen.getByAltText("John's profile picture")
    expect(profileImg).toBeInTheDocument()
    expect(profileImg).toHaveAttribute("src", "https://example.com/profile.jpg")

    expect(screen.getByText("John")).toBeInTheDocument()

    const mainImg = screen.getByAltText("A beautiful day!")
    expect(mainImg).toBeInTheDocument()
    expect(mainImg).toHaveAttribute("src", defaultProps.imgUrl)
  })

  it("renders caption when provided", async () => {
    render(<PhotoComponent {...defaultProps} caption="My awesome caption" />)

    await waitFor(() => {
      expect(screen.getByText("My awesome caption")).toBeInTheDocument()

      expect(screen.getByAltText("My awesome caption")).toBeInTheDocument()
    })
  })

  it("does not render caption when not provided", async () => {
    render(<PhotoComponent {...defaultProps} caption={undefined} />)

    await waitFor(() => {
      expect(screen.queryByText("A beautiful day!")).not.toBeInTheDocument()

      expect(screen.getByAltText("User uploaded photo")).toBeInTheDocument()
    })
  })

  it("renders location when provided", async () => {
    render(<PhotoComponent {...defaultProps} location="New York, USA" />)

    await waitFor(() => {
      expect(screen.getByText("📍New York, USA")).toBeInTheDocument()
    })
  })

  it("does not render location when not provided", async () => {
    render(<PhotoComponent {...defaultProps} location={undefined} />)

    await waitFor(() => {
      expect(screen.queryByText(/📍/)).not.toBeInTheDocument()
      expect(screen.queryByText("Mittweida, Germany")).not.toBeInTheDocument()
    })
  })

  it("uses placeholder for profile picture if profilePicture is missing from user data", async () => {
    mockUseSWR.mockReturnValue({
      data: {
        firstName: "Jane",
        profilePicture: undefined,
      } as MockUser,
      isLoading: false,
      error: undefined,
    })

    render(<PhotoComponent {...defaultProps} />)

    await waitFor(() => {
      const profileImg = screen.getByAltText("Jane's profile picture")
      expect(profileImg).toBeInTheDocument()
      expect(profileImg).toHaveAttribute("src", "https://placehold.co/40")
    })
  })

  it("handles null user data gracefully (e.g., if SWR returns null for data)", async () => {
    mockUseSWR.mockReturnValue({
      data: null,
      isLoading: false,
      error: undefined,
    })

    render(<PhotoComponent {...defaultProps} />)

    await waitFor(() => {
      const profileImg = screen.getByAltText("User's profile picture")
      expect(profileImg).toBeInTheDocument()
      expect(profileImg).toHaveAttribute("src", "https://placehold.co/40")

      expect(screen.queryByText("John")).not.toBeInTheDocument()
      expect(screen.queryByText("Jane")).not.toBeInTheDocument()
    })
  })

  it("ensures the main image has the correct src and class", async () => {
    render(<PhotoComponent {...defaultProps} />)
    await waitFor(() => {
      const mainImage = screen.getByAltText("A beautiful day!")
      expect(mainImage).toBeInTheDocument()
      expect(mainImage).toHaveAttribute("src", defaultProps.imgUrl)
      expect(mainImage).toHaveClass("object-cover w-full h-full pt-2")
    })
  })
})
