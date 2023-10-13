import React, { useContext } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { MyContext } from '../Context';
import './Styles/BreadCrumbs.scss';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const BasicBreadcrumbs = () => {
  const {breadcrumb, setBreadCrumb} = useContext(MyContext);

  return (
    <div className='breadcrumbs-container' role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          {breadcrumb}
        </Link>
      </Breadcrumbs>
    </div>
  );
}

export default BasicBreadcrumbs;