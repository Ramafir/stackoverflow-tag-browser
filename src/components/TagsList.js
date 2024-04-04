import React from 'react';
import PropTypes from 'prop-types';

const TagsList = ({ tags, page }) => {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                                Tag
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Count
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {tags[page]?.map(tag => (
                            <tr key={tag.name}>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                    {tag.name}
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {tag.count}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

TagsList.propTypes = {
    tags: PropTypes.array,
    page: PropTypes.number
};

export default TagsList;
