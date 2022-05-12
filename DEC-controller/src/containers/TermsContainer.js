/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState } from 'react';
import { Button, Label, Col, FormGroup, Form, InputGroup, Input, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Auth                from '../helpers/Auth';
import { useTranslation }  from 'react-i18next' ;
import '../assets/styles/TermsContainer.css';
import '../assets/styles/global.css';

function TermsContainer(props) {

	const [checkBox, setCheckBox] = useState(false);

	const [modal, setModal]       = useState(false);

	const toggle = () => setModal(!modal);

	const { t } = useTranslation();

	const handleSubmit = () => {
		if (checkBox) {
			Auth.authenticate();
			props.history.replace('/iqnidentite')
		}
		else {
			toggle();
		}
	}

	const handleChange = () => {
		setCheckBox(!checkBox);
	}

	return (
		<div className="Root">
			<Container className="App" >
				<Form className="form">
					<h3 className="text-center">{t('translation:terms')}</h3>
					<p className="justifyText">
						{t('translation:termsMsgPara1')} 
						<br/>
						<br/>
						{t('translation:termsMsgPara2')} 
						<br/>
						<br/>
						{t('translation:termsMsgPara3')} 
						<br/>
						<br/>
						{t('translation:termsMsgPara4')} 
						<br/>
						<span className="text-center" style={{fontWeight: 'bold'}}>
							{t('translation:email')} 
						</span>
						<br/>
					</p>
					<h3 className="text-center">{t('translation:termsMsgSubTitle')}</h3>
					<p className="justifyText">
					{t('translation:termsMsgPara5')} 
					</p>
					<div className="next-step-container ">
						<Col>
							<FormGroup>
								<label className="text-justify align-center">
									<input className="m-1" type="checkbox" checked={checkBox} onChange={handleChange}/>
									{t('translation:termsCheckBoxMsg')}
								</label>
							</FormGroup>
						</Col>
						<Button className="mt-2 primary-btn-qc" disabled={!checkBox} outline color="primary" size="lg" onClick={handleSubmit}>{t('translation:termsBtn')}</Button>
					</div>
				</Form>
			</Container>
		</div >
	);
}

export default TermsContainer;