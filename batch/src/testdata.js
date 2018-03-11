export const comp_test_data = 
  [{
  name: 'Site 1',
  shortdesc: 'Location for Cooling Towers',
  desc: 'This is the description of site one.',
  contacts: [],
  equipment: [{
    name: 'Tower 1',
    shortdesc: 'Cooling Tower for Plant 1',
    desc: 'Site 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet finibus quam ac accumsan. Phasellus iaculis malesuada quam semper rhoncus. In posuere ullamcorper eleifend. Praesent eget fermentum nulla.',
    contacts: [{
      firstname: 'John',
      lastname: 'Doe',
      phone: '510 999 1234'
    }],
    history: [{
      type: 'repair',
      parts: ['nail', 'screw']
    },
    {
      type: '12m scheduled maintenance',
      labor: '15',
      cost: '1500'
    }]
  },
  {
    name: 'Tower 2',
    shortdesc: 'Auxiliary Cooling Tower for Plant 1',
    desc: 'Site 1: Vivamus sodales purus turpis, in dictum metus malesuada vitae. Morbi vitae luctus sem. ',
    contacts: [{
      firstname: 'John',
      lastname: 'Doe',
      phone: '(510) 999-1234'
    },
    {
      firstname: 'Ludvig',
      lastname: 'Vandervig',
      phone: '(415) 398-9999'
    },
    {
      firstname: 'Petter',
      lastname: 'Viig',
      phone: '(415) 398-9999'
    }],
    history: [{
      type: 'repair',
      parts: ['nail', 'screw']
    },
    {
      type: '12m scheduled maintenance',
      labor: '15',
      cost: '1500'
    }]
  }]
},
{
  name: 'Site 2',
  shortdesc: 'Location for Water Purification System',
  desc: 'This is the description of site two.',
  contacts: [],
  equipment: [{
    name: 'Purification Machine 1',
    desc: 'Site 2: Curabitur sagittis dui ut risus fermentum, sed euismod tortor pharetra.',
    contacts: [{
      firstname: 'John',
      lastname: 'Doe',
      phone: '(510) 999-1234'
    },
    {
      firstname: 'Petter',
      lastname: 'Viig',
      phone: '(415) 398-9999'
    }],
    history: [{
      type: 'repair',
      parts: ['nail', 'screw']
    },
    {
      type: '12m scheduled maintenance',
      labor: '15',
      cost: '1500'
    }]
  },
  {
    name: 'Purification Machine 2',
    desc: 'Praesent ac ultricies elit, ac varius nulla.',
    contacts: [{
      firstname: 'John',
      lastname: 'Doe',
      phone: '(510) 999-1234'
    }],
    history: [{
      type: 'repair',
      parts: ['nail', 'screw']
    },
    {
      type: '12m scheduled maintenance',
      labor: '15',
      cost: '1500'
    }]
  }]
}]