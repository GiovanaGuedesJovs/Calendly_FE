import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Form, Modal } from 'react-bootstrap';
import { Container, Button, Stepper, Step, StepLabel } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/Master.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Importação do componente Link do React Router

const ValidandoConta = () => {

  // Estado para controlar o passo ativo do stepper.
  const [activeStep, setActiveStep] = useState(1);

  // Estado para armazenar os dados da agenda.
  const [agendaData, setAgendaData] = useState({
    nome: '',
    inicioDisponibilidade: '',
    fimDisponibilidade: '',
    diasSelecionados: []
  });

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    token: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.name && userData.email && userData.phone) {
      setShowModal(true);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage(''); // Limpar mensagem de erro ao fechar o modal
  };

  const handleTokenChange = (event, index) => {
    const { value } = event.target;
    if (!isNaN(value) && value.length === 1) {
      const updatedToken = userData.token.split('');
      updatedToken[index] = value;
      setUserData({ ...userData, token: updatedToken.join('') });
  
      if (updatedToken.join('').length === 6 && updatedToken.join('') === "123456") {
        // Token válido, redirecione para a página Calendar
        window.location.href = '/calendario'; // Redireciona para a página de validação da conta
      } else if (updatedToken.join('').length === 6 && updatedToken.join('') !== "123456") {
        // Token inválido, exiba mensagem de erro
        setErrorMessage('Token inválido. Por favor, insira o token correto.');
        // Limpar token
        setUserData({ ...userData, token: '' });
      }
    }
  };
  
  return (
    <Container className="custom-container">
      <Link to="/" className="voltar"><FontAwesomeIcon icon={faArrowLeft} className="icon" /></Link> {/* Adicionando o redirecionamento para "/" */}
        {/* Componente Stepper para mostrar o progresso do preenchimento da agenda. */}
        <Stepper activeStep={activeStep} alternativeLabel orientation="horizontal">
        <Step>
          <StepLabel>Dados Pessoais</StepLabel>
        </Step>
        <Step>
          <StepLabel>Dados da Agenda</StepLabel>
        </Step>
      </Stepper>
      <hr></hr>
      <h2 className="text-left titlePage">Dados da Agenda...</h2>
      <p className="instrucao">Insira os dados principais da sua agenda para começar.</p>
      <Form onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="Nome"
        variant="outlined"
        className="w-100"
        name="name"
        value={userData.name}
        onChange={handleChange}
        style={{ marginBottom: '40px' }}
      />
      <TextField
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        className="w-100"
        name="email"
        value={userData.email}
        onChange={handleChange}
        style={{ marginBottom: '40px' }}
      />
      <TextField
        id="outlined-basic"
        label="Celular"
        variant="outlined"
        className="w-100"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
      />
        <Button variant="primary" type="submit" className="w-100 btnContinuar">
          Criar agenda
        </Button>
      </Form>
          
      <Modal show={showModal} onHide={handleCloseModal} className="modal" backdrop="static">
        <Modal.Body className="text-center">
          Foi enviado um token para o seu celular. <br></br>Insira ele abaixo:
          <div id="dadosToken">
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={userData.token[index] || ''}
                onChange={(event) => handleTokenChange(event, index)}
                style={{ width: "2rem", margin: "0.2rem" }}/>
            ))}
          </div>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ValidandoConta;
