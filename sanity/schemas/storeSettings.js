import {MdStore as icon} from 'react-icons/md';

export default {
    // computer name
    name: 'storeSettings',
    // visible title
    title: 'Settings',
    type: 'document',    
    icon: icon,
    fields: [
        {
            name: 'name',
            title: 'Store Name',
            type: 'string',
            description: 'Name of the pizza'
        },
        {
            name: 'slicemaster',
            title: 'Slicemasters Currently Slicing',
            type: 'array',
            of: [{type: 'reference', to:[{type: 'person'}]}]
        },
        {
            name: 'hotSlices',
            title: 'Hot slices available',
            type: 'array',
            of: [{type: 'reference', to:[{type: 'pizza'}]}]
        }
    ],    
};