import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import moment from 'moment';
import './assets/css/Components.css';
import './assets/css/Master.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCog } from '@fortawesome/free-solid-svg-icons';


moment.locale('pt-br');

const EventosAgendados = () => {
  const [events, setEvents] = useState([
    {
      title: 'Serviço 1',
      start: new Date(2024, 2, 17, 10, 0),
      end: new Date(2024, 2, 17, 11, 0),
      color: 'pink'
    },
    {
      title: 'Serviço 2',
      start: new Date(2024, 2, 17, 10, 0),
      end: new Date(2024, 2, 17, 11, 0),
      color: 'red'
    },
    {
      title: 'Serviço 3',
      start: new Date(2024, 2, 17, 10, 0),
      end: new Date(2024, 2, 17, 11, 0),
      color: 'green'
    },
    {
      title: 'Serviço 4',
      start: new Date(2024, 2, 17, 10, 0),
      end: new Date(2024, 2, 17, 11, 0),
      color: 'blue'
    },
    {
      title: 'Serviço 5',
      start: new Date(2024, 2, 17, 10, 0),
      end: new Date(2024, 2, 17, 11, 0),
      color: 'purple'
    },
    {
      title: 'Serviço 6',
      start: new Date(2024, 2, 18, 14, 0),
      end: new Date(2024, 2, 18, 15, 30),
      color: 'green'
    },
  ]);

  const [selectedEvents, setSelectedEvents] = useState([]);

  const toggleEventSelection = (event) => {
    const isSelected = selectedEvents.some(selectedEvent => selectedEvent.title === event.title);
    if (isSelected) {
      setSelectedEvents(selectedEvents.filter(selectedEvent => selectedEvent.title !== event.title));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  return (
    <Container className="custom-container">
      <div className="espacoIcon"></div>
      <h2 className="text-left">Minha Agenda</h2>
      <select className="inputText form-select tiposCalendario" onChange={(e) => window.location.href = e.target.value}>
        <option value="/eventos-agendados">Eventos Agendados</option>
        <option value="/calendario">Calendário</option>
        <option value="/tipos-eventos">Tipos de Serviço</option>
      </select>
      <div className="event-list">
        {events.map((event, index) => (
          <div
            key={index}
            className={`event-item ${selectedEvents.some(selectedEvent => selectedEvent.title === event.title) ? 'selected' : ''}`}
            onClick={() => toggleEventSelection(event)}
          >
          <div className="row acoes">
            <div className="col">
              <div className={`bolinha ${selectedEvents.some(selectedEvent => selectedEvent.title === event.title) ? 'selected' : ''}`} onClick={(e) => toggleEventSelection(event, e)}></div>
            </div>
            <div className="col">
              <FontAwesomeIcon icon={faCog} className="config"/>
            </div>
          </div>


            <div className="row">
              <div className="col-9 colInfo">
                <div className="event-description">
                  <div className="event-type">{event.title}</div>
                  <br />
                  {event.description}
                </div>
                <div className="event-duration">
                  {`${moment(event.end).diff(event.start, 'minutes')} minutos`}
                </div>
              </div>
              <div className="col-3">
                <div className="day-extended">{moment(event.start).format('DD/MM/yyyy')}</div>
              </div>
            </div>
            <div className="row">
              <div className="lineColor col-12" style={{ backgroundColor: event.color }}>&nbsp;</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default EventosAgendados;
