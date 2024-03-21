import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './assets/css/Components.css';
import './assets/css/Master.css';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);
const CustomToolbar = ({ label, onNavigate, onView }) => {
  const currentDate = moment(label).format('MMMM');
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group w-100">
        <span className="rbc-toolbar-label">{currentDate}</span>
        <button type="button" className="rbc-btn rbc-btn-primary seta" onClick={() => onNavigate('PREV')}>
          {'<'}
        </button>
        <button type="button" className="rbc-btn rbc-btn-primary seta" onClick={() => onNavigate('NEXT')}>
          {'>'}
        </button>
      </span>
      <span className="rbc-btn-group group2">
        <button type="button" className=" rbc-btn-primary" onClick={() => onView('day')}>
          Dia
        </button>
        <button type="button" className=" rbc-btn-primary" onClick={() => onView('week')}>
          Semana
        </button>
        <button type="button" className="rbc-btn-primary" onClick={() => onView('month')}>
          Mês
        </button>
      </span>
    </div>
  );
};


const Calendario = () => {
  const [events, setEvents] = useState([
    {
      title: 'Serviço 1',
      start: new Date(2024, 2, 17, 10, 0),
      end: new Date(2024, 2, 17, 11, 0),
      color: 'blue'
    },
    {
      title: 'Serviço 2',
      start: new Date(2024, 2, 18, 14, 0),
      end: new Date(2024, 2, 18, 15, 30),
      color: 'green'
    },
  ]);

  const [view, setView] = useState('month');
  const [currentLabel, setCurrentLabel] = useState(moment().toDate()); // Initialize with current date

  const filteredEvents = () => {
    switch (view) {
      case 'day':
        return events.filter(event => moment(event.start).isSame(moment(currentLabel), 'day'));
      case 'month':
        return events.filter(event => moment(event.start).isSame(moment(currentLabel), 'month'));
      default:
        return events;
    }
  };

  return (
    <Container className="custom-container">
      <div className="espacoIcon"></div>
      <h2 className="text-left">Minha Agenda</h2>
      <select className="inputText form-select tiposCalendario" onChange={(e) => window.location.href = e.target.value}>
        <option value="/calendario">Calendário</option>
        <option value="/eventos-agendados">Eventos Agendados</option>
        <option value="/tipos-eventos">Tipos de Serviço</option>
      </select>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          toolbar: (props) => <CustomToolbar {...props} onView={setView} />,
        }}
        view={view}
        onView={(newView) => setView(newView)}
        onNavigate={(date) => setCurrentLabel(date)}
      />
      <div className="event-list">
        {filteredEvents().map((event, index) => (
          <div key={index} className="event-item">
            <div className="row">
              <div className="col-3">
                <div className="day-number">{moment(event.start).format('D')}</div>
                <div className="day-of-week">{moment(event.start).format('dddd')}</div>
              </div>
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

export default Calendario;
