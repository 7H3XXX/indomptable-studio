export interface Member {
  name: string;
  role: string;
  /** An Unsplash photo id. */
  photo: string;
}

// Placeholders. Replace with the real team, their roles and portraits before launch.
export const team: Member[] = [
  {
    name: "Founder name",
    role: "Founder, strategy",
    photo: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    name: "Team member",
    role: "Design lead",
    photo: "photo-1494790108377-be9c29b29330",
  },
  {
    name: "Team member",
    role: "Engineering lead",
    photo: "photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Team member",
    role: "Data and AI lead",
    photo: "photo-1438761681033-6461ffad8d80",
  },
];

/** A portrait crop, so every face sits in the same frame. */
export const portrait = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?w=${width}&h=${Math.round(width * 1.25)}&fit=crop&crop=faces&q=80`;
