import React from 'react';

import TagsList  from '../components/TagsList';

export default {
    title: 'Example/TagsList',
    component: TagsList,
};

const Template = (args) => <TagsList {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    tags: {
        1: [
            { name: 'Tag1', count: 10 },
            { name: 'Tag2', count: 20 },
            { name: 'Tag3', count: 10 },
            { name: 'Tag4', count: 20 },
            { name: 'Tag5', count: 10 },
            { name: 'Tag6', count: 21 },
            { name: 'Tag7', count: 10 },
            { name: 'Tag8', count: 37 },
        ],
    },
    page: 1,
};
