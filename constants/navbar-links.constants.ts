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
];

export const profileLinks: ProfileLink[] = [
  {
    href: '/profile',
    label: 'settings',
  },
  {
    href: '/profile',
    label: 'change profile',
  },
  {
    href: '/profile',
    label: 'language',
  },
];
