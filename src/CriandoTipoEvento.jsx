import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Form, Modal } from 'react-bootstrap';
import { Container, Button, Stepper, Step, StepLabel } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './assets/css/Components.css';
import './assets/css/Master.css';
import { Link } from 'react-router-dom';

const CriandoTipoEvento = () => {
  const [eventoData, setEventoData] = useState({
    nome: '',
    duracao: '',
    valor: '',
    descricao: '',
    cor: '#FF5733'
  });

  // Estado para controlar o passo ativo do stepper.
  const [activeStep, setActiveStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventoData({
      ...eventoData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (eventoData.nome && eventoData.duracao && eventoData.valor && eventoData.descricao) {
      window.location.href = '/tipos-eventos';
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage('');
  };

  const coresDisponiveis = ['#FF5733', '#33FF68', '#3366FF', '#FF33EB', '#FFFF33', '#FF00FF', '#00FF00', '#00FFFF', '#0000FF', '#FFA500', '#8A2BE2', '#00CED1', '#4682B4', '#808080', '#008080'];

  // Função para gerar os horários
  const gerarHorarios = () => {
    const horarios = [];
    for (let hora = 0.5; hora <= 5; hora += 0.5) {
      const horas = Math.floor(hora);
      const minutos = (hora - horas) * 60;
      const horaFormatada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
      horarios.push(horaFormatada);
    }
    return horarios;
  };

  return (
    <Container className="custom-container">
      <Link to="/tipos-eventos" className="voltar"><FontAwesomeIcon icon={faArrowLeft} className="icon" /></Link>
      {/* Componente Stepper para mostrar o progresso do preenchimento da agenda. */}
      <Stepper activeStep={activeStep} alternativeLabel orientation="horizontal">
        <Step>
          <StepLabel>Ver Lista Tipos</StepLabel>
        </Step>
        <Step>
          <StepLabel>Dados Nova Lista</StepLabel>
        </Step>
      </Stepper>
      <hr></hr>
      <h2 className="text-left titlePage">Dados da Nova Lista...</h2>
      <p className="instrucao">Para criar um novo tipo de evento, insira os dados abaixo.</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nome">
          <Form.Label className="labelInput">Nome do evento:</Form.Label>
          <div class="contentNomeColor">
            <div id="ddlColor" className="dropdown form-select inputText ddlColor">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div
                  className="selected-color"
                  style={{ backgroundColor: eventoData.cor, width: '20px', height: '20px', borderRadius: '50%' }}
                />
              </button>
              <div className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} aria-labelledby="dropdownMenuButton" style={{ paddingTop: '0', paddingBottom: '0' }}>
                <div className="dropdown-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {[...Array(3)].map((_, rowIndex) => (
                    <div key={rowIndex} className="dropdown-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {coresDisponiveis.slice(rowIndex * 5, (rowIndex + 1) * 5).map((cor, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          style={{ backgroundColor: cor, width: '30px', height: '30px', margin: '5px', borderRadius: '50%' }}
                          onClick={() => {
                            setEventoData({ ...eventoData, cor });
                            setDropdownOpen(false);
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Form.Control type="text" name="nome" value={eventoData.nome} onChange={handleChange} placeholder="Insira aqui o nome do evento" className="inputText"/>
          </div>
        </Form.Group>
        <Form.Group controlId="duracao">
          <TextField
            select
            label="Duração do evento"
            variant="outlined"
            className="selectpicker w-100"
            value={eventoData.duracao}
            onChange={(e) => handleChange(e)}
            name="duracao"
            style={{ marginBottom: '40px', marginTop: '10px' }}
          >
            {gerarHorarios().map((horario, index) => (
              <MenuItem key={index} value={horario}>
                {horario}
              </MenuItem>
            ))}
          </TextField>
        </Form.Group>
        <Form.Group controlId="valor">
          <TextField
            label="Valor"
            variant="outlined"
            type="text"
            name="valor"
            value={eventoData.valor}
            onChange={(e) => handleChange(e)}
            placeholder="Insira aqui o valor do evento"
            className="inputText"
            style={{ marginBottom: '40px' }}
          />
        </Form.Group>
        <Form.Group controlId="descricao">
          <TextField
            label="Descrição"
            variant="outlined"
            multiline
            rows={4} // Você pode ajustar o número de linhas conforme necessário
            name="descricao"
            value={eventoData.descricao}
            onChange={(e) => handleChange(e)}
            placeholder="Insira aqui o valor do evento"
            className="inputText"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 btnContinuar">
          Criar tipo de evento
        </Button>
      </Form>
      <Modal show={showModal} onHide={handleCloseModal} className="modal" backdrop="static">
        <Modal.Body className="text-center">
          Seu tipo de evento foi criado com sucesso!
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </Modal.Body>
      </Modal>
    </Container>
  );

};

export default CriandoTipoEvento;
