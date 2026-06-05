const sidebars = {
  dsaSidebar: [
    {
      type: 'category',
      label: 'Dynamic Programming',
      collapsible: true,
      collapsed: false,
      link: {
        type: 'doc',
        id: 'DSA/DynamicProgramming/index',
      },
      items: [
        {
          type: 'category',
          label: 'Form 1',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'DSA/DynamicProgramming/Form1/index',
          },
          items: ['DSA/DynamicProgramming/Form1/problem1', 'DSA/DynamicProgramming/Form1/Knapsack'],
        },
        {
          type: 'category',
          label: 'Form 2',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'DSA/DynamicProgramming/Form2/index',
          },
          items: ['DSA/DynamicProgramming/Form2/Substrings'],
        },
        {
          type: 'category',
          label: 'Form 3',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'DSA/DynamicProgramming/Form3/index',
          },
          items: [],
        },
        {
          type: 'category',
          label: 'Form 4',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'DSA/DynamicProgramming/Form4/index',
          },
          items: [],
        },
        {
          type: 'category',
          label: 'Form 5',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'DSA/DynamicProgramming/Form5/index',
          },
          items: [],
        },
      ],
    },
  ],
};

export default sidebars;