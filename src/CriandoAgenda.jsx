import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Container, Button, Stepper, Step, StepLabel } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/Master.css';

const CriarAgenda = () => {
  // Estado para controlar o passo ativo do stepper.
  const [activeStep, setActiveStep] = useState(0);

  // Estado para armazenar os dados da agenda.
  const [agendaData, setAgendaData] = useState({
    nome: '',
    inicioDisponibilidade: '',
    fimDisponibilidade: '',
    diasSelecionados: []
  });

  // Função para lidar com a mudança nos campos de entrada.
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Atualiza o estado com os novos valores.
    setAgendaData({ ...agendaData, [name]: value });

    // Verifica se está alterando o horário de início ou fim.
    if (name === "inicioDisponibilidade" || name === "fimDisponibilidade") {
      const { inicioDisponibilidade, fimDisponibilidade } = agendaData;

      // Se ambos os campos estiverem preenchidos.
      if (inicioDisponibilidade && fimDisponibilidade) {
        const horaInicio = inicioDisponibilidade.split(":");
        const horaFim = fimDisponibilidade.split(":");

        const minutosInicio = parseInt(horaInicio[0]) * 60 + parseInt(horaInicio[1]);
        const minutosFim = parseInt(horaFim[0]) * 60 + parseInt(horaFim[1]);

        // Se o horário de fim for menor ou igual ao horário de início, corrige o horário de fim.
        if (minutosFim <= minutosInicio) {
          // Ajusta o horário de fim para ser pelo menos 30 minutos depois do horário de início.
          const novoMinutoFim = minutosInicio + 30;
          const horasNovoFim = Math.floor(novoMinutoFim / 60);
          const minutosNovoFim = novoMinutoFim % 60;
          const novoHorarioFim = `${horasNovoFim.toString().padStart(2, '0')}:${minutosNovoFim.toString().padStart(2, '0')}`;

          setAgendaData((prevState) => ({
            ...prevState,
            fimDisponibilidade: novoHorarioFim
          }));
        }
      }
    }
  };

  // Função para gerar opções de horário de término baseado no horário de início.
  const gerarOpcoesFim = (horaInicio) => {
    const opcoes = [];
    const [horasInicio, minutosInicio] = horaInicio.split(":");
    const minutosInicioTotal = parseInt(horasInicio) * 60 + parseInt(minutosInicio);

    // Gera opções de horário de término para cada meia hora após o horário de início.
    for (let i = 6; i <= 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const horas = i < 10 ? `0${i}` : `${i}`;
        const minutos = j === 0 ? '00' : '30';
        const minutosTotal = i * 60 + j;

        // Adiciona apenas opções que são maiores que o horário de início.
        if (minutosTotal > minutosInicioTotal) {
          opcoes.push(
            <MenuItem key={`${horas}:${minutos}`} value={`${horas}:${minutos}`}>{`${horas}:${minutos}`}</MenuItem>
          );
        }
      }
    }
    return opcoes;
  };

  // Função para lidar com a mudança de seleção dos dias da semana.
  const handleDiaChange = (dia) => {
    const diasSelecionados = agendaData.diasSelecionados.includes(dia)
      ? agendaData.diasSelecionados.filter(d => d !== dia)
      : [...agendaData.diasSelecionados, dia];
    setAgendaData({ ...agendaData, diasSelecionados });
  };

  // Função para lidar com o envio do formulário.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      agendaData.nome &&
      agendaData.inicioDisponibilidade &&
      agendaData.fimDisponibilidade &&
      agendaData.diasSelecionados.length > 0
    ) {
      // Verifica se o horário de fim é maior que o horário de início.
      const horaInicio = agendaData.inicioDisponibilidade.split(":");
      const horaFim = agendaData.fimDisponibilidade.split(":");

      const minutosInicio = parseInt(horaInicio[0]) * 60 + parseInt(horaInicio[1]);
      const minutosFim = parseInt(horaFim[0]) * 60 + parseInt(horaFim[1]);

      if (minutosFim <= minutosInicio) {
        alert("O horário de fim deve ser maior que o horário de início.");
        return;
      }

      setActiveStep(activeStep + 1);
      // Redireciona para a próxima página após concluir a criação da agenda.
      window.location.href = '/validando-conta';
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  // Função para gerar opções de horário.
  const gerarOpcoes = () => {
    const opcoes = [];
    for (let i = 6; i <= 24; i++) {
      if (i < 10) {
        opcoes.push(<MenuItem key={i} value={`0${i}:00`}>{`0${i}:00`}</MenuItem>);
        opcoes.push(<MenuItem key={i + 0.5} value={`0${i}:30`}>{`0${i}:30`}</MenuItem>);
      } else if (i === 24) {
        opcoes.push(<MenuItem key={i} value={`00:00`}>{`00:00`}</MenuItem>);
      } else {
        opcoes.push(<MenuItem key={i} value={`${i}:00`}>{`${i}:00`}</MenuItem>);
        opcoes.push(<MenuItem key={i + 0.5} value={`${i}:30`}>{`${i}:30`}</MenuItem>);
      }
    }
    return opcoes;
  };

  return (
    <Container className="custom-container">
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
      <h2 className="text-left titlePage">Dados Pessoais...</h2>
      <p className="instrucao">Insira os dados principais da sua agenda para começar.</p>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          className="w-100"
          name="nome" 
          value={agendaData.nome} 
          onChange={handleChange}
        />
        {/* Instrução para inserir o horário de disponibilidade durante a semana. */}
        <p className="instrucao">Coloque aqui o seu horário de disponibilidade durante a semana:</p>
        <div className="row rowHorario">
          <div className="col colHora" id="col1Hora">
            <TextField
              select
              label="Horário início"
              variant="outlined"
              className="selectpicker w-100"
              value={agendaData.inicioDisponibilidade}
              onChange={(e) => handleChange(e)}
              name="inicioDisponibilidade"
            >
              {gerarOpcoes()}
            </TextField>
          </div>
          <div className="col colHora" id="col2Hora">
            <TextField
              select
              label="Horário fim"
              variant="outlined"
              className="selectpicker w-100"
              value={agendaData.fimDisponibilidade}
              onChange={(e) => handleChange(e)}
              name="fimDisponibilidade"
            >
              {gerarOpcoes()}
            </TextField>
          </div>
        </div>
        {/* Instrução para selecionar os dias da semana. */}
        <p className="instrucao">Selecione os dias da semana:</p>
        <div className="row">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((dia, index) => (
            <div className="col text-center cardCol" key={index}>
              <span>{dia}</span>
              <br />
              <input
                type="checkbox"
                id={dia}
                checked={agendaData.diasSelecionados.includes(dia)}
                onChange={() => handleDiaChange(dia)}
              />
            </div>
          ))}
        </div>
        <div className="row">
          {/* Botão para enviar o formulário. */}
          <Button variant="contained" color="primary" type="submit" className="w-100 btnContinuar">
            {/* Texto do botão muda para "Concluir" após preencher os dados. */}
            {activeStep === 1 ? "Concluir" : "Continuar"}
          </Button>
        </div>
      </form>
    </Container>
  );
  
};

export default CriarAgenda;
