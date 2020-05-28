import React, { Children } from 'react';
import { useRouter } from 'next/router';
import Link from 'components/LinkMaster';

const ActiveLink = ({ children, activeClassName, activeTab, ...props }) => {
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  let isActive = props.href === activeTab;
  let className = isActive ? `${childClassName} ${activeClassName}`.trim() : childClassName;
  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null
      })}
    </Link>
  );
};

export default ActiveLink;
