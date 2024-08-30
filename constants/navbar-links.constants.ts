type NavBarLink = {
  href: string;
  label: string;
};

type ProfileLink = {
  href: string;
  label: string;
};

export const navbarLinks: NavBarLink[] = [
  {
    href: '/',
    label: 'Homepage',
  },
  {
    href: 'create-post',
    label: 'Create Post',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/posts',
    label: 'Posts',
  },
  {
    href: '/profile',
    label: 'Profile',
  },
];

export const profileLinks: ProfileLink[] = [
  {
    href: '/profile/settings',
    label: 'settings',
  },
  {
    href: '/profile/settings',
    label: 'change profile',
  },
  {
    href: '/profile/settings',
    label: 'language',
  },
];
