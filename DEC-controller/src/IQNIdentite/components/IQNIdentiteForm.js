/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState }      from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useHistory }           from 'react-router-dom'
import { useTranslation }       from 'react-i18next'
import { v4 as uuidv4 }         from 'uuid'
import { GET_API_SECRET }       from '../../config/constants'
import { GET_ISSUER_HOST_URL }  from '../../config/endpoints'
import UploadIcon from '@material-ui/icons/CloudUpload';
import '../../assets/styles/Forms.css'
import '../../assets/styles/global.css'

const IQNIdentiteForm = () => {

  /**
   * Set la librairie d'internationalisation
   */
  const { t } = useTranslation(['translation','identite']);

  function formatID(){
    return "did:sov:" + uuidv4().substring(25);
  }

  const getFormattedDate = (date) => {
    return date.getFullYear() + '-' + date.getMonth().toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
  }

  /**
   * Definition des variables du formulaire
   */
  const currentDate = new Date();
  const defaultExpirationDate = new Date((currentDate.getFullYear() + 1), currentDate.getMonth(), currentDate.getDate());

  const [issuanceDate, setIssuanceDate]             = useState(getFormattedDate(currentDate));
  const [expirationDate, setExpirationDate]         = useState(getFormattedDate(defaultExpirationDate));
  const [identificationLevel, setIdentificationLevel] = useState(1);
  const [firstNames, setFirstNames]                 = useState('Sarah');
  const [lastName, setLastName]                     = useState('Courcy');
  const [birthDate, setBirthDate]                   = useState('1976-11-08');
  const [parent1FullName, setParent1FullName]         = useState('Marie Courcy');
  const [parent2FullName, setParent2FullName]         = useState('inconnu');
  
  const [selectedFile, setSelectedFile]             = useState('');
  const [photoPreview, setPhotoPreview]             = useState('');

  // Date d'expiration calculée en fonction de l'âge légal, dans le cas d'attestation pour enfants

  // Controle de dropdown pour gender 
  const [genderdropdownOpen, setGenderOpen] = useState(false)
  const gendertoggle = () => setGenderOpen( !genderdropdownOpen)
  // Controle de dropdown pour holder 
  const [holderDropdownOpen, setHolderOpen] = useState(false)
  const holderToggle = () => setHolderOpen( !holderDropdownOpen)
   
  /**
   * Fais toggle entre le modal et le mode normal. 
   */
  const toggle = () => setModal(!modal);
  const [modal, setModal]                   = useState(false);
  const history                             = useHistory();

  
  const validateIdentificationLevel = (identificationLevel) => {
    if (identificationLevel > 3) {
      setIdentificationLevel(3);
    }
    else if(identificationLevel < 1) {
      setIdentificationLevel(1);
    }
    else {
      setIdentificationLevel(identificationLevel);
    }
  }
  

  /**
   * Traitement du click du button. Si les champs obligatoires ne sont pas remplis, 
   * émmetre un message d'erreur et retourner l'usager au form; sinon, soumettre une 
   * appel pour faire la création d'une invitation de connection avec 
   * /connections/create-invitation. Redirect vers /qrcodecertnaissance. 
   */
  const handleRequest = () => {
    if (issuanceDate       === '' |
        firstNames         === '' | 
        lastName           === '' | 
        expirationDate     === '' | 
        birthDate          === '' | 
        parent1FullName     === '' | 
        parent2FullName     === '' | 
        selectedFile       === '' ) {
      toggle();
    }
    else {
      creerInvitation('/qriqnidentite'); 
    }
  }

    /**
     * Création du buffer de la photo, bien que de son preview. 
     * @param {*} event 
     */
    function handleFiles(event) {
  
        // Attributions initiales
        let files = event.target.files;
        let file  = files[0];
        let img   = document.createElement("img");

        img.width = 400;
        img.classList.add("obj");
        img.file  = file;

        // Faire la lecture du fichier sur disque, puis créér le buffer et le preview
        const reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { 
            aImg.src = e.target.result; 
            setPhotoPreview(aImg.src);  // créé la pre-visualisation de la photo
            setSelectedFile(aImg.src);  // créé le buffer de la photo
            return aImg.src;
        }; })(img);
        reader.readAsDataURL(file);
    }

  function creerInvitation(destination){
    fetch('/connections/create-invitation',
    {
      method: 'POST',
      headers: {
        'HOST'                         : `${GET_ISSUER_HOST_URL}`,
        'X-API-Key'                    : `${GET_API_SECRET()}`,
        'Content-Type'                 : 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin'  : '*', 
        'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS', 
        'Access-Control-Allow-Headers' : 'Content-Type', 
        'Access-Control-Max-Age'       : '86400'
      }
    }).then((
      resp => resp.json().then((
        data => {
          console.log(data);
          history.push(destination,
            {
              type: "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation", 
              data: {
                issuanceDate       : issuanceDate, 
                expirationDate     : expirationDate, 
                firstNames         : firstNames, 
                lastName           : lastName, 
                birthDate          : birthDate, 
                parent1FullName     : parent1FullName, 
                parent2FullName     : parent2FullName, 
                photo              : selectedFile,
                identificationLevel: identificationLevel
              },
              invitation: data
            } 
          )
        }
      ))
    ))
  }

  /*
  * Fait le calcule de la date de majorité d'une personne, à partir de sa date de naissance. 
  * On assume que la majorité est atteinte à l'âge de 18 ans. 
  */
  function calcMajority(){
    let dateNaissance = birthDate.split('-');
    let expirationYear = parseInt(dateNaissance[0])+ 18;
    console.log( (expirationYear) + '-' + dateNaissance[1] + '-' + dateNaissance[2]);
    expirationDate = ((expirationYear) + '-' + dateNaissance[1] + '-' + dateNaissance[2]);    
  }

  function changePersonne(e){
      let target = e.target.innerText; 
     
      if(target === 'Vous' || target === 'Yourself'){
        setFirstNames('Sarah'); 
        setParent2FullName('Marie Courcy'); 
        setParent1FullName('Mathieu Courcy'); 
        setBirthDate('1976-11-08'); 
        setIssuanceDate('2019-07-17');
      } else {
        setFirstNames('Alice'); 
        setParent2FullName('Sarah Courcy'); 
        setParent1FullName('Michel Courcy'); 
        setBirthDate('2020-12-22'); 
        setIssuanceDate('2020-12-22');
      }
  }

  return (
    <Form className="text-center FormBox m-2">
      <h1 className="mb-3 pb-4 mt-3 header">{t('identite:digitalID')}</h1>
      <div className='instructions mb-2'>
       <p className='h4'>{t('identite:instructions')}</p>
      </div>
      <FormGroup>
        <Label for="firstNames">{t('identite:credentialSubject.firstNames')}: *</Label>
        <Input type="text" className="inputField rounded" name="firstNames" id="firstNames" onChange={(e) => setFirstNames(e.target.value)} placeholder={t('identite:credentialSubject.firstNames')} value={firstNames} />
      </FormGroup>
    
      <FormGroup>
        <Label for="lastName">{t('identite:credentialSubject.lastName')}: *</Label>
        <Input type="text" className="inputField rounded" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} placeholder={t('identite:credentialSubject.lastName')} value={lastName} />
      </FormGroup>
    
      <FormGroup>
        <Label for="birthDate">{t('identite:credentialSubject.birthDate')}: *</Label>
        <Input type="date" className="inputField rounded" name="birthDate" id="birthDate" onChange={(e) => setBirthDate(e.target.value)} placeholder={t('identite:credentialSubject.birthDate')} value={birthDate} />
      </FormGroup>
      <FormGroup>
        <Label for="fatherFullName">{t('identite:credentialSubject.parent1FullName')}: *</Label>
        <Input type="text" className="inputField rounded" name="parent1FullName" id="parent1FullName" onChange={(e) => setParent1FullName(e.target.value)} placeholder={t('identite:credentialSubject.parent1FullName')} value={parent1FullName} />
      </FormGroup>
      <FormGroup>
        <Label for="motherFullName">{t('identite:credentialSubject.parent2FullName')}: *</Label>
        <Input type="text" className="inputField rounded" name="parent2FullName" id="parent2FullName" onChange={(e) => setParent2FullName(e.target.value)} placeholder={t('identite:credentialSubject.parent2FullName')} value={parent2FullName} />
      </FormGroup>
      <FormGroup>
        <Label for="issuanceDate">{t('identite:issuanceDate')}: *</Label>
        <Input type="date" disabled className="inputField rounded" name="issuanceDate" id="issuanceDate" onChange={(e) => setIssuanceDate(e.target.value)} placeholder={t('identite:issuanceDate')} value={issuanceDate} />
      </FormGroup>
      <FormGroup>
        <Label for="expirationDate">{t('identite:expirationDate')}: *</Label>
        <Input type="date" className="inputField rounded" name="expirationDate" id="expirationDate" onChange={(e) => setExpirationDate(e.target.value)} placeholder={t('identite:expirationDate')} value={expirationDate} />
      </FormGroup>
      <FormGroup>
        <Label for="identificationLevel">{t('identite:credentialSubject.identificationLevel')}: *</Label>
        <Input type="number" max={3} min={1} className="inputField rounded" name="identificationLevel" id="identificationLevel" onChange={(e) => validateIdentificationLevel(e.target.value)} placeholder={t('identite:credentialSubject.identificationLevel')} value={identificationLevel} />
      </FormGroup>
      <div className='next-step-container'>
        <Button onClick={handleRequest} className='primary-btn-qc m-3' outline color="primary">{t('identite:btnIssue')}</Button>
      </div>

      <div>
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>{t('identite:IQNIdentity')}</ModalHeader>
          <ModalBody>{t('identite:modalMessage')}</ModalBody>
          <ModalFooter>
            <Button color="primary" className='primary-btn-qc' outline onClick={toggle}>{t('identite:ok')}</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    </Form>
  );
} 

export default IQNIdentiteForm;