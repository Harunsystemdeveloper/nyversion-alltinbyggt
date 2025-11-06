export const CATEGORIES = [
  'Meddelande',
  'Påminnelse',
  'Event',
  'Info',
] as const

export type Category = typeof CATEGORIES[number]

