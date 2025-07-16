import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, cleanup, waitFor } from "@testing-library/react"
import React from "react"
import VoteTally from "../VoteTally"
import type { PollOption, Activity, PollVote } from "@/api/db.types"

describe("VoteTally", () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  const mockPollVote: PollVote = {
    id: "vote1",
    userId: "user1",
    pollId: "poll1",
    pollOptionId: "option1",
    createdAt: new Date(),
  }

  const mockActivity: Activity = {
    id: "activity1",
    name: "Skiing Adventure Park",
    description: "Fun in the snow",
    address: "123 Ski Lane",
    latitude: 10,
    longitude: 20,
    videoUrl: null,
    imageUrl: null,
    category: "Sport",
    openHours: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    PollOption: [],
  }

  it("renders the poll title correctly", () => {
    const title = "Favorite Activity"
    const options: PollOption[] = []

    render(<VoteTally title={title} options={options} />)

    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it("renders options with activity names and correct vote counts", () => {
    const title = "Best Place to Visit"
    const options: PollOption[] = [
      {
        id: "opt1",
        text: "Option A",
        pollId: "p1",
        activityId: "act1",
        activity: { ...mockActivity, id: "act1", name: "Beach Getaway" },
        votes: [mockPollVote, { ...mockPollVote, id: "vote2" }],
      },
      {
        id: "opt2",
        text: "Option B",
        pollId: "p1",
        activityId: "act2",
        activity: { ...mockActivity, id: "act2", name: "Mountain Hike" },
        votes: [],
      },
      {
        id: "opt3",
        text: "Option C",
        pollId: "p1",
        activityId: "act3",
        activity: { ...mockActivity, id: "act3", name: "City Tour" },
        votes: [mockPollVote],
      },
    ]

    render(<VoteTally title={title} options={options} />)

    expect(screen.getByText("Beach:")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()

    expect(screen.getByText("Moun..:")).toBeInTheDocument()
    expect(screen.getByText("0")).toBeInTheDocument()

    expect(screen.getByText("City:")).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()
  })

  it("renders options with text field and correct vote counts when activity is null", () => {
    const title = "Food Preference"
    const options: PollOption[] = [
      {
        id: "optA",
        text: "Pizza",
        pollId: "p2",
        activityId: "none",
        activity: undefined,
        votes: [
          mockPollVote,
          { ...mockPollVote, id: "voteX" },
          { ...mockPollVote, id: "voteY" },
        ],
      },
      {
        id: "optB",
        text: "Pasta",
        pollId: "p2",
        activityId: "none",
        activity: undefined,
        votes: [],
      },
    ]

    render(<VoteTally title={title} options={options} />)

    expect(screen.getByText("Pizza:")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()

    expect(screen.getByText("Pasta:")).toBeInTheDocument()
    expect(screen.getByText("0")).toBeInTheDocument()
  })

  it("truncates long names and displays short names as is", () => {
    const title = "Name Truncation Test"
    const options: PollOption[] = [
      {
        id: "optLongActivity",
        text: "Some Text",
        pollId: "p3",
        activityId: "actLong",
        activity: {
          ...mockActivity,
          id: "actLong",
          name: "Supercalifragilisticexpialidocious",
        },
        votes: [],
      },
      {
        id: "optLongText",
        text: "ExtremelyLongOptionText",
        pollId: "p3",
        activityId: "none",
        activity: undefined,
        votes: [],
      },
      {
        id: "optShortActivity",
        text: "Some Text",
        pollId: "p3",
        activityId: "actShort",
        activity: { ...mockActivity, id: "actShort", name: "Book" },
        votes: [],
      },
      {
        id: "optShortText",
        text: "Car",
        pollId: "p3",
        activityId: "none",
        activity: undefined,
        votes: [],
      },
      {
        id: "optMultiWordText",
        text: "Multi Word Option",
        pollId: "p3",
        activityId: "none",
        activity: undefined,
        votes: [],
      },
      {
        id: "optMultiWordActivity",
        text: "Some Other Text",
        pollId: "p3",
        activityId: "actMulti",
        activity: {
          ...mockActivity,
          id: "actMulti",
          name: "Grand Canyon Tour",
        },
        votes: [],
      },
    ]

    render(<VoteTally title={title} options={options} />)

    expect(screen.getByText("Supe..:")).toBeInTheDocument()

    expect(screen.getByText("Extr..:")).toBeInTheDocument()

    expect(screen.getByText("Book:")).toBeInTheDocument()

    expect(screen.getByText("Car:")).toBeInTheDocument()

    expect(screen.getByText("Multi:")).toBeInTheDocument()

    expect(screen.getByText("Grand:")).toBeInTheDocument()
  })

  it('displays "Unknown" when both activity name and text are missing', () => {
    const title = "Mystery Poll"
    const options: PollOption[] = [
      {
        id: "optUnknown",
        text: "",
        pollId: "p4",
        activityId: "none",
        activity: { ...mockActivity, id: "actUnknown", name: "" },
        votes: [],
      },
      {
        id: "optTrulyUnknown",
        text: undefined as any,
        pollId: "p4",
        activityId: "none",
        activity: undefined,
        votes: [],
      },
    ]

    render(<VoteTally title={title} options={options} />)

    expect(screen.getAllByText("Unkn..:")[0]).toBeInTheDocument()
    expect(screen.getAllByText("Unkn..:")[1]).toBeInTheDocument()
  })

  it("updates vote counts when the options prop changes", async () => {
    const title = "Dynamic Poll"
    const initialOptions: PollOption[] = [
      {
        id: "dynOpt1",
        text: "Choice 1",
        pollId: "p5",
        activityId: "none",
        activity: undefined,
        votes: [mockPollVote],
      },
    ]

    const { rerender } = render(
      <VoteTally title={title} options={initialOptions} />
    )

    const initialChoice1Text = screen.getByText("Choice:")
    expect(initialChoice1Text).toBeInTheDocument()
    expect(initialChoice1Text.nextElementSibling).toHaveTextContent("1")

    const updatedOptions: PollOption[] = [
      {
        id: "dynOpt1",
        text: "Choice 1",
        pollId: "p5",
        activityId: "none",
        activity: undefined,
        votes: [
          mockPollVote,
          { ...mockPollVote, id: "voteNew1" },
          { ...mockPollVote, id: "voteNew2" },
        ],
      },
      {
        id: "dynOpt2",
        text: "Choice 2",
        pollId: "p5",
        activityId: "none",
        activity: undefined,
        votes: [mockPollVote],
      },
    ]

    rerender(<VoteTally title={title} options={updatedOptions} />)

    await waitFor(() => {
      const allChoiceTexts = screen.getAllByText("Choice:")
      expect(allChoiceTexts.length).toBe(2)

      expect(allChoiceTexts[0].nextElementSibling).toHaveTextContent("3")

      expect(allChoiceTexts[1].nextElementSibling).toHaveTextContent("1")
    })
  })

  it("renders correctly with an empty options array", () => {
    const title = "Empty Poll"
    const options: PollOption[] = []

    render(<VoteTally title={title} options={options} />)

    expect(screen.getByText(title)).toBeInTheDocument()

    expect(screen.queryByText(":")).not.toBeInTheDocument()
    expect(screen.queryByText(/\d/)).not.toBeInTheDocument()
  })
})
