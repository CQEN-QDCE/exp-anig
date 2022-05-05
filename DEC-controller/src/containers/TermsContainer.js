/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState } from 'react';
import { Button, Label, Col, FormGroup, Form, InputGroup, Input, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Auth                from '../helpers/Auth';
import { useTranslation }  from 'react-i18next' 
import '../assets/styles/TermsContainer.css'

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
		<div className="Root" style={{ backgroundColor: '#FCF8F7' }}>

			<Container className="App" >
				<Form className="form">
					<h2 className="text-center">{t('translation:terms')}</h2>
					<p className="text-center" style={{ color: '#898989', fontSize: '12px' }}>
						{t('translation:termsMsg')} 
					</p>
					<Col>
						<FormGroup>
							<label className="text-center align-center">
								<input className="m-2" type="checkbox" checked={checkBox} onChange={handleChange}/>
								{t('translation:termsCheckBoxMsg')}
							</label>
						</FormGroup>
					</Col>
					<div className="text-center ">
						<Button className="mt-2" outline color="primary" size="lg" onClick={handleSubmit}>{t('translation:termsBtn')}</Button>
					</div>
				</Form>
				<div>
					<Modal isOpen={modal} toggle={toggle} centered>
						<ModalHeader toggle={toggle}>{t('translation:modalTermsMsg')}</ModalHeader>
						<ModalBody>{t('translation:modalAcceptTermsInfoMsg')}</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={toggle}>{t('translation:ok')}</Button>{' '}
						</ModalFooter>
					</Modal>
				</div>
			</Container>
		</div >
	);
}

export default TermsContainer;