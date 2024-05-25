// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconBug, IconHome } from '@tabler/icons';

// constant
const icons = { IconBug, IconKey, IconHome };

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
const pages = {
    id: 'Dashboard',
    // title: <FormattedMessage id="Dashboard" />,
    // caption: <FormattedMessage id="pages-caption" />,
    type: 'group',
    children: [
        {
            id: 'Dashboard',
            title: <FormattedMessage id="Dashbard" />,
            type: 'item',
            url: '/dashboard'
        },
        {
            id: 'Meet Safe Now',
            title: <FormattedMessage id="Meet Safe Now" />,
            type: 'item',
            url: '/friends'
        },
        {
            id: 'Display Name',
            title: <FormattedMessage id="Display Name" />,
            type: 'item',
            url: '/display-name'
        },
        {
            id: 'Availability',
            title: <FormattedMessage id="Availability" />,
            type: 'item',
            url: '/availability'
        },
        {
            id: 'Profile Settings',
            title: <FormattedMessage id="Profile Settings" />,
            type: 'collapse',
            children: [
                {
                    id: 'Change Picture',
                    title: (
                        <>
                            <FormattedMessage id="Change Picture" />
                        </>
                    ),
                    type: 'item',
                    url: '/change-picture'
                },
                {
                    id: 'Change Password',
                    title: (
                        <>
                            <FormattedMessage id="Change Password" />
                        </>
                    ),
                    type: 'item',
                    url: '/change-password'
                    // target: true
                }
            ]
        },    
    ]
};

export default pages;
