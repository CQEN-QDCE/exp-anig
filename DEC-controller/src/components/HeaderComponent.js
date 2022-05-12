/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';

import { useHistory, useLocation }    from 'react-router-dom';
import { useTranslation }             from 'react-i18next'
import { globalStyles }               from '../assets/styles/globalStyles';
import Auth                           from '../helpers/Auth';
import useWindowDimensions            from '../helpers/useWindowDimensions';
import QuebecLogo                     from '../assets/images/logoQuebec.png';
import LogoutIcon                     from '@material-ui/icons/ExitToApp';

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { height, width } = useWindowDimensions();

  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    Auth.signout();
    history.replace('/');
  };

  const handleClickLogo = () => {
    Auth.signout();
    history.replace('/');
  }

  return (
    <Navbar color="light" light expand="sm" fixed="top" style={globalStyles.navbar}>     
      <NavbarBrand className="navbar-brand oneliner">
        <img src={QuebecLogo} alt="quebec-logo" onClick={handleClickLogo} style={globalStyles.navbarLogo} />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar className="ml-auto">
          {Auth.getAuth() && (
            <NavItem>
              <Button  onClick={handleLogout} className='secondary-btn-qc m-3' outline color="primary"> <LogoutIcon />{' '} {t('translation:btnLogout')}</Button>
            </NavItem>
          ) }
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default HeaderComponent;
