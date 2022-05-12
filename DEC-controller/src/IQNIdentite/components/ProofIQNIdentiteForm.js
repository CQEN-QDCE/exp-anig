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
      <FormGroup row>
        <Label for="birthDate" sm={3}>
        {t('identite:credentialSubject.birthDate')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="birthDate" id="birthDate" value={birthDate} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="parent1FullName" sm={3}>
        {t('identite:credentialSubject.parent1FullName')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="parent1FullName" id="parent1FullName" value={parent1FullName} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="parent2FullName" sm={3}>
        {t('identite:credentialSubject.parent2FullName')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="parent2FullName" id="parent2FullName" value={parent2FullName} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="identificationLevel" sm={3}>
        {t('identite:credentialSubject.identificationLevel')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="identificationLevel" id="identificationLevel" value={identificationLevel} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="issuanceDate" sm={3}>
        {t('identite:issuanceDate')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="issuanceDate" id="issuanceDate" value={issuanceDate} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="expirationDate" sm={3}>
        {t('identite:expirationDate')}
        </Label>
        <Col sm={10}>
          <Input type="text" name="expirationDate" id="expirationDate" value={expirationDate} disabled />
        </Col>
      </FormGroup>
      <br />
    </Col>
  );
}
