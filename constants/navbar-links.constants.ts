type NavBarLink = {
  href: string;
  label: string;
};

export const navbarLinks:NavBarLink[] = [
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
