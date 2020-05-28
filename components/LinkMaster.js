import NextLink, { LinkProps } from 'next/link';
import { format } from 'url';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig()
const LinkMaster = ({ children, ...props }) => {
  let asLink =  (publicRuntimeConfig.basePath || '') + format(props.href);
  let href =  props.href;
  
  if(props.as){
    asLink = (publicRuntimeConfig.basePath || '') + props.as
    href =  (publicRuntimeConfig.basePath || '') + format(props.href);
  }
  return <NextLink
    {...props}
    href = {href}
    as = {asLink}
  >
    {children}
  </NextLink>
}

export default LinkMaster;