import React from 'react';
import ActiveLink from './ActiveLink';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// import 'styles/nav.scss';

const links = [
  { href: '/', label: 'Giới thiệu', icon: 'home' },
  { href: '/guilds/create', label: 'Tạo bang', icon: 'create' },
  { href: '/guilds/join', label: 'Gia nhập bang', icon: 'join' },
  { href: '/guilds/me', label: 'Bang của tôi', icon: 'star' }
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`
}));

const Nav = () => {
  let activeTab = null;
  const { pathname } = useRouter();

  links.forEach(element => {
    if (
      (element.href == '/' && pathname === element.href) ||
      (element.href != '/' && pathname.startsWith(element.href))
    ) {
      activeTab = element.href;
    }
    if (!activeTab && element.href === Cookies.get('previosActiveTab')) {
      activeTab = element.href;
    }
    if (activeTab) {
      Cookies.set('previosActiveTab', activeTab);
    }
  });

  return (
    <nav>
      <ul>
        {links.map(({ key, href, label, icon }) => (
          <li key={key}>
            <ActiveLink href={href} activeClassName='active' activeTab={activeTab}>
              <a>
                <span className={icon}></span>
                {label}
              </a>
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
