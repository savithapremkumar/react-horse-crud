import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { shallow, mount } from 'enzyme';
import App from './App';
import Header from './components/Header';
import { MemoryRouter } from 'react-router';
import HorseList from './views/horseList';




it('renders without crashing', () => {
  shallow(<App />);
});


it('renders App header', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Header).prop("heading")).toEqual("Race Horse Stats");
  console.log(wrapper.debug());
});

//TODO : Test for default and other routing