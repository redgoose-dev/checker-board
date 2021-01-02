const date = new Date();

export const defaultPreference = {
  language: 'en', // en,ko
  dateFormat: '{yyyy}-{mm}-{dd}',
  dateRange: [[date.getFullYear(), date.getMonth() + 1], [date.getFullYear(), date.getMonth() + 2]],
  theme: 'system', // light, dark, system
  box: null,
  board: null,
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
  },
};
