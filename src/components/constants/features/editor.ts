export const TOOLBAR_TABS = {
  HOME: 'Home',
  LAYOUT: 'Layout',
} as const;

export type ToolbarTab = (typeof TOOLBAR_TABS)[keyof typeof TOOLBAR_TABS];