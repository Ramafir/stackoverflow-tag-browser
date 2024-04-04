import React from 'react';

import Pagination from '../components/Pagination';

export default {
    title: 'Example/Pagination',
    component: Pagination,
};

const Template = (args) => <Pagination {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    total: 50,
    currentPage: 1,
    perPage: 10,
    setNextPage: () => {},
    setPreviousPage: () => {},
    setTagsPerPage: () => {},
};
