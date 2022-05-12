/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React              from 'react';
import { Container }      from 'reactstrap';
import IQNIdentiteForm    from '../components/IQNIdentiteForm'
import '../../assets/styles/TermsContainer.css'

function IQNIdentiteContainer() {

	return (
		<div className="Root" style={{ display: "flex" }}>
			<Container >
				<IQNIdentiteForm className="justify-content-center" />
			</Container>
		</div >
	);
}

export default IQNIdentiteContainer;