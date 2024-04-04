import React from 'react';

import SortControls from '../components/SortControls';

export default {
    title: 'Example/SortControls',
    component: SortControls,
};

const Template = (args) => <SortControls {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    orderBy: 'desc',
    sortBy: 'popular',
    setOrderBy: () => {},
    setSortBy: () => {},
};
