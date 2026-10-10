export const TOOLBAR_TABS = {
  HOME: 'Home',
  LAYOUT: 'Layout',
} as const;

export type ToolbarTab = (typeof TOOLBAR_TABS)[keyof typeof TOOLBAR_TABS];

export const FONT_SIZES_OPTIONS = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '20px', label: '20px' },
  { value: '24px', label: '24px' },
  { value: '28px', label: '28px' },
  { value: '32px', label: '32px' },
  { value: '36px', label: '36px' },
  { value: '40px', label: '40px' },
  { value: '48px', label: '48px' },
  { value: '64px', label: '64px' },
  { value: '72px', label: '72px' },
];

export const FONT_FAMILIES_OPTIONS = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Palatino, serif', label: 'Palatino' },
  { value: 'Garamond, serif', label: 'Garamond' },
  { value: 'Comic Sans MS, cursive', label: 'Comic Sans MS' },
  { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
  { value: 'Arial Black, sans-serif', label: 'Arial Black' },
  { value: 'Impact, sans-serif', label: 'Impact' },
  { value: 'Tahoma, sans-serif', label: 'Tahoma' },
  { value: 'Lucida Console, monospace', label: 'Lucida Console' },
  { value: 'Courier, monospace', label: 'Courier' },
  { value: 'Brush Script MT, cursive', label: 'Brush Script MT' },
];