import {UserRole } from 'utils/UserRole';
export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  roles?: UserRole[]; // New field
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    path: '/authentication/recent-activities',
    icon: 'ion:home-sharp',
    active: true,
    collapsible: false,
  },
  {
    title: 'Dashboard',
    path: '/authentication/dashboard',
    icon: 'icomoon-free:drawer',
    active: true,
    collapsible: false,
    
  },
  {
    title: 'Social Workers',
    path: '/authentication/',
    icon: 'mingcute:grid-fill',
    active: true,
    collapsible: true,
     roles: ['ngo-admin'], // Only visible to NGO Admin
    sublist: [
      {
        title: 'All Social Worker',
        path: 'socialworkerlist',
        active: false,
        collapsible: false,
      },
      {
        title: 'Add Social Worker',
        path: 'addsocialworker',
        active: false,
        collapsible: false,
      },
    ],
  },

  {
    title: 'Clients',
    path: '/authentication',
    icon: 'tabler:shopping-bag',
    active: true,
    collapsible: true,
     roles: ['ngo-admin'], // Only visible to NGO Admin
    sublist: [
      {
        title: 'All Clients',
        path: 'clientlist',
        active: true,
        collapsible: false,
       
      },{
            title: 'Add Clients',
            path: 'addclient',
            active: true,
            collapsible: false,
          },
        ],
  },

  {
    title: 'NGO Admin',
    path: 'authentication',
    icon: 'f7:exclamationmark-shield-fill',
    active: true,
    collapsible: true,
     roles: ['ngo-admin'], // Only visible to NGO Admin
    sublist: [
      {
        title: 'All  Admins',
        path: 'adminlistngo',
        active: true,
        collapsible: false,
      },
      {
        title: 'Add Admin',
        path: 'addadminngo',
        active: true,
        collapsible: false,
      },
    ],
  },

  {
    title: 'View Applications',
    path: '/authentication/applicationmanagement',
    icon: 'mingcute:grid-fill',
    active: true,
    collapsible: false,
     roles: ['rehab-admin'], // Only visible to NGO Admin
  },
  {
    title: 'Add Admin',
    path: '/authentication/addrehabadmin',
    icon: 'tabler:shopping-bag',
    active: true,
    collapsible: false,
     roles: ['rehab-admin'], // Only visible to NGO Admin
  },
  {
    title: 'User Profile',
    path: '/authentication/userprofile',
    icon: 'ph:user-circle-fill',
    active: true,
    collapsible: false,
    
  },
];

export default navItems;
