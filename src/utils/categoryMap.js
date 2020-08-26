export const activityCategories = [
  {
    color: 'magenta',
    name: 'Math',
  },
  {
    color: 'green',
    name: 'Science',
  },
  {
    color: 'volcano',
    name: 'P.E.',
  },
  {
    color: 'orange',
    name: 'Geography',
  },
  {
    color: 'gold',
    name: 'Social Studies',
  },
  {
    color: 'lime',
    name: 'Cooking',
  },
  {
    color: 'red',
    name: 'Foreign Language',
  },
  {
    color: 'cyan',
    name: 'Music',
  },
  {
    color: 'blue',
    name: 'Meditation',
  },
  {
    color: 'geekblue',
    name: 'Reading',
  },
  {
    color: 'purple',
    name: 'Other',
  },
  {
    color: '#108ee9',
    name: 'Freetime',
  },
  {
    color: '#b728ff',
    name: 'Outdoors',
  },
  { color: '#219bff', name: 'Crafts' },
  {
    color: '#ff782a',
    name: 'Indoors',
  },
  {
    color: '#ddcb22',
    name: 'Cleaning',
  },
].sort((a, b) => (a.name < b.name ? -1 : 1));

export const categoryMap = (category = 'Other') => {
  const selectedCategory = activityCategories.find(
    item => item.name === category
  );
  return selectedCategory.color;
};
