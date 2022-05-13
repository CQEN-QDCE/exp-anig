/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                                      from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent                            from '../components/HeaderComponent'
import FooterComponent                            from '../components/FooterComponent'
import MainContainer                              from '../containers/MainContainer'
import NoAuthContainer                            from '../containers/NoAuthContainer'
import IQNIdentiteContainer                       from '../IQNIdentite/containers/IQNIdentiteContainer'
import QRIQNIdentiteContainer                     from '../IQNIdentite/containers/QRIQNIdentiteContainer'
import ProofIQNIdentiteContainer                  from '../IQNIdentite/containers/ProofIQNIdentiteContainer'
import QRIQNPreuveContainer                       from '../IQNPreuve/containers/QRIQNPreuveContainer'
import VerificationPreuveContainer                from '../IQNPreuve/containers/VerificationPreuveContainer'
import VerificationIdentiteContainer              from '../IQNIdentite/containers/VerificationIdentiteContainer'
import EmissionIdentiteContainer                  from '../containers/EmissionIdentiteContainer'
import Auth from '../helpers/Auth'
import ImageHanderContainer from '../ImageHandling/containers/ImageHandlerContainer'
import TermsContainer from '../containers/TermsContainer'

function Routes() {
	return (
		<Router>
			<div>
				<Route component={HeaderComponent}/>
				<Switch>

					{ /* Routes attestation DEC - IQN Identité */ }
					<Route path="/iqnidentite" component={IQNIdentiteContainer} />
					<Route path="/qriqnidentite" component={QRIQNIdentiteContainer} />
					<Route path="/verificationidentite" component={VerificationIdentiteContainer} />
					<Route path="/proofiqnidentite" component={ProofIQNIdentiteContainer} />

					{ /* Routes attestation DEC - Preuve d'identité */ }
					<Route path="/qriqnpreuve" component={QRIQNPreuveContainer} />
					<Route path="/verificationPreuve" component={VerificationPreuveContainer} />
					<Route path="/preuve" component={VerificationPreuveContainer} />
					<Route path="/emissionidentite" component={EmissionIdentiteContainer} />

                    <Route path="/imageHandler" component={ImageHanderContainer} /> 

					{ /* Routes de base de l'app */ }
					<Route path="/noauth" component={NoAuthContainer} />
					<Route path="/terms" component={TermsContainer}/>
					<Route path="/" exact component={MainContainer} />

				</Switch>
				<FooterComponent />
			</div>
		</Router>
	)
}

export default Routes
