export const defaultPreference = {
  language: "ko",
  dateFormat: "0",
  box: null,
  board: null,
};

export const defaultModelData = {
  box: {
    name: 'Welcome Box',
    description: 'first box',
    reset: '06:00',
  },
  board: {
    box: 1,
    date: new Date(),
    body: `# first board content body\n\n- [ ] check item\n- [ ] check item`,
  },
};
