import { dbInformation } from '@/libs/const';

export const defaultPreference = {
  language: 'en', // en,ko
  dateFormat: '{yyyy}-{mm}-{dd}',
  dateRange: [
    new Date().getFullYear(),
    new Date(new Date().setFullYear(new Date().getFullYear() + 5)).getFullYear(),
  ],
  theme: 'system', // light, dark, system
  box: null,
  board: null,
  version: dbInformation.version,
};

export const defaultModelData = {
  box: {
    name: 'Welcome',
    description: 'first box',
    reset: '06:00',
  },
  board: {
    box: 1,
    date: new Date(),
    body: `# first board content body\n\n- [ ] check item\n- [ ] check item`,
    percent: 0,
  },
};
