const sidebars = {
  dsaSidebar: [
    {
      type: 'category',
      label: 'Dynamic Programming',
      collapsible: true,
      collapsed: true,
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
          items: ['DSA/DynamicProgramming/Form2/Substrings', 
                'DSA/DynamicProgramming/Form2/GridTraversal',
                'DSA/DynamicProgramming/Form2/LIS',
                'DSA/DynamicProgramming/Form2/LAS' ],
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
          items: ['DSA/DynamicProgramming/Form3/LCS','DSA/DynamicProgramming/Form3/DUS' ],
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
          items: ['DSA/DynamicProgramming/Form4/BurstBalloons'],
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
    {
      type: 'category',
      label: 'Bit Manipulation',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'DSA/BitManipulation/index',
      },
      items: [
        {
          type: 'category',
          label: 'FAQs',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'DSA/BitManipulation/FAQs/index'
          },
          items:[]
        },
        {
          type: 'category',
          label: 'Application 1',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'DSA/BitManipulation/Application 1/index'
          },
          items:[]
        },
        {
          type: 'category',
          label: 'Mixed Practice',
          collapsible: true,
          collapsed: true,
          link: {
            type: 'doc',
            id: 'DSA/BitManipulation/MixedPractice/index'
          },
          items:['DSA/BitManipulation/MixedPractice/sxorsum',
                'DSA/BitManipulation/MixedPractice/bdiffpos'
          ]
        }
      ],
    },
  ],
};

export default sidebars;