/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React               from 'react';
import { Button } from 'reactstrap';
import { useTranslation }  from 'react-i18next';
import { useHistory }    from 'react-router-dom';
import '../assets/styles/JumbotronComponent.css';

const JumbotronComponent = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleLogin = () => {
    history.push('/terms');
  };
  return (
    <header>
      <div className="pt-5 container-fluid text-center" >

        <div className="row center-content" >
          <div className="col-md-7 col-sm-12">
           
              
            
            <h1 style={{color: '#223654'}}>Gouvernement du Québec</h1>
            <p className='h2 mt-4' style={{color: '#223654'}}>Preuve de concept</p>
            
            <p className="lead mt-5">
              {t('translation:welcomeMessage')}
            </p>
            <Button outline color="primary" className='primary-btn-qc' variant="contained" onClick={handleLogin} >
                {t('translation:btnLogin')}
            </Button> 
          </div>
        </div>
      </div>
    </header>
  );
};

export default JumbotronComponent;