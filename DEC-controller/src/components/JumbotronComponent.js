/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React               from 'react'
import { useTranslation }  from 'react-i18next'
import '../assets/styles/JumbotronComponent.css'

const JumbotronComponent = () => {
  const { t } = useTranslation();
  return (
    <header>
      <div className="pt-5 container-fluid text-center" >

        <div className="row center-content" >
          <div className="col-md-7 col-sm-12">
            <h1>Gouvernement du Québec</h1>
            <p className="lead">
              {t('translation:welcomeMessage')}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default JumbotronComponent;