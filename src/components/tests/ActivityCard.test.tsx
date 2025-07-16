import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import ActivityCard from "../ActivityCard"

import type * as ReactRouter from "react-router"

const mockNavigate = vi.fn()
vi.mock("react-router", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof ReactRouter
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockOpenHours = {
  mon: { open: "09:00", close: "17:00" },
  tue: { open: "09:00", close: "17:00" },
  wed: { open: "09:00", close: "17:00" },
  thu: { open: "09:00", close: "17:00" },
  fri: { open: "09:00", close: "17:00" },
  sat: { open: "10:00", close: "14:00" },
  sun: { open: "11:00", close: "15:00" },
}

const defaultProps = {
  imgUrl: "https://example.com/image.jpg",
  name: "Test Activity",
  openHours: mockOpenHours,
  description:
    "This is a test description for a fantastic activity that everyone should try. It is quite long to test truncation.",
  address: "123 Test Street, Test City",
  category: "Adventure",
  id: "123",
}

describe("ActivityCard", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.setSystemTime(new Date("2025-07-14T10:00:00.000Z")) // Monday, 10:00 AM (within open hours)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("renders correctly with essential props", () => {
    render(<ActivityCard {...defaultProps} />)
    expect(screen.getByText("Test Activity")).toBeInTheDocument()
    expect(screen.getByAltText("image of Test Activity")).toBeInTheDocument()
    expect(screen.getByText("123 Test Street, Test City")).toBeInTheDocument()
    expect(screen.getByText("#Adventure")).toBeInTheDocument()
    expect(screen.getByText(/This is a test description/)).toBeInTheDocument()
  })

  it('displays "Open Now" when current time is within open hours', async () => {
    vi.setSystemTime(new Date("2025-07-14T10:00:00.000Z"))
    render(<ActivityCard {...defaultProps} />)
    await waitFor(() => {
      const openBadge = screen.getByText("Open Now")
      expect(openBadge).toBeInTheDocument()

      expect(openBadge).toHaveClass("bg-[#e5fce7]")
    })
  })

  it('displays "Closed Now" when current time is outside open hours', async () => {
    vi.setSystemTime(new Date("2025-07-14T18:00:00.000Z")) // Monday, after closing
    render(<ActivityCard {...defaultProps} />)
    await waitFor(() => {
      const closedBadge = screen.getByText("Closed Now")
      expect(closedBadge).toBeInTheDocument()

      expect(closedBadge).toHaveClass("bg-[#ffe8ea]")
    })
  })

  it('displays "Closed Now" for a day with no specified open hours (e.g., if a day is missing in openHours)', async () => {
    const customOpenHours = {
      mon: { open: "09:00", close: "17:00" },

      wed: { open: "09:00", close: "17:00" },
    }
    vi.setSystemTime(new Date("2025-07-15T10:00:00.000Z"))
    render(<ActivityCard {...defaultProps} openHours={customOpenHours} />)
    await waitFor(() => {
      expect(screen.getByText("Closed Now")).toBeInTheDocument()
    })
  })

  it("truncates description if it exceeds 109 characters", () => {
    const longDescription =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    render(<ActivityCard {...defaultProps} description={longDescription} />)
    const descriptionElement = screen.getByText(
      longDescription.slice(0, 100) + "..."
    )
    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement.textContent?.length).toBeLessThanOrEqual(104)
  })

  it("does not truncate description if it is 109 characters or less", () => {
    const shortDescription = "This is a short description."
    render(<ActivityCard {...defaultProps} description={shortDescription} />)
    expect(screen.getByText(shortDescription)).toBeInTheDocument()
  })

  it("navigates to the activity detail page on click", async () => {
    render(<ActivityCard {...defaultProps} />)
    const card = screen.getByText("Test Activity").closest("div")
    if (card) {
      fireEvent.click(card)
    }
    expect(mockNavigate).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        `/activity/${defaultProps.id}`,
        {
          state: {
            isOpen: true,
          },
        }
      )
    })
  })

  it("renders video when vidUrl is provided", () => {
    const videoUrl =
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    render(<ActivityCard {...defaultProps} vidUrl={videoUrl} />)

    const videoElement = document.querySelector("video")
    expect(videoElement).toBeInTheDocument()
    expect(videoElement).toHaveAttribute("src", videoUrl)
    expect(videoElement).toHaveAttribute("autoplay")

    expect(
      screen.queryByAltText("image of Test Activity")
    ).not.toBeInTheDocument()
  })

  it("renders image when vidUrl is not provided", () => {
    render(<ActivityCard {...defaultProps} />)
    expect(screen.getByAltText("image of Test Activity")).toBeInTheDocument()
    expect(document.querySelector("video")).not.toBeInTheDocument()
  })
})
