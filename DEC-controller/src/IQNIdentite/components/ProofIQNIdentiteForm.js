/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                            from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { useTranslation }               from 'react-i18next'

export default function ProofIQNIdentiteForm(props) {
  const { id,
    issuanceDate,
    expirationDate,
    firstNames,
    lastName, 
    birthDate, 
    parent1FullName, 
    parent2FullName, 
    identificationLevel
  } = props.data.data

  const { t } = useTranslation(['translation', 'identite']);
  
  return (
    <Col lg={5}>
      <h5 className="mb-4 pb-4 mt-2 text-center">{t('identite:infoIQNIdentity')}</h5>
      <FormGroup row>
        <Label for="firstNames" sm={3}>
        {t('identite:credentialSubject.firstNames')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="firstNames" id="firstNames" value={firstNames} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="lastName" sm={3}>
        {t('identite:credentialSubject.lastName')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="lastName" id="lastName" value={lastName} disabled />
        </Col>
      </FormGroup>
      <br />
    </Col>
  );
}
