/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/await-async-utils */
import React from 'react';
import { cleanup, act, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('Testes', () => {
  beforeEach( async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    })
    // waitFor(() => expect(global.fetch).toBeCalled)
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => render(<App />));

  });

  afterEach(() => {
    // jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
  });

  test('Testa se os planetas vêm do estado', async () => {
    const planets = screen.getAllByTestId('planet');
    expect(planets).toHaveLength(10);

    const input = screen.getByTestId('name-filter');
    expect(input).toBeInTheDocument();

    userEvent.type(input, 'oo')
    // expect(input).toHaveValue('oo');
    waitFor(() => expect(planets).toHaveLength(2))
    
    userEvent.clear(input);
    waitFor(() => expect(planets).toHaveLength(10))

    await screen.findByTestId('population1');

    const inputColumn =  screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const inputButton = screen.getByTestId('button-filter');
    
    // inputColumn.map((iC) => expect(iC).toBeInTheDocument())
    expect(inputComparison).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(inputButton).toBeInTheDocument();
    
    userEvent.selectOptions(inputColumn, ['rotation_period']);
    userEvent.selectOptions(inputComparison, ['maior que']);
    userEvent.type(inputValue, '20' );
    userEvent.click(inputButton);

    // const planets = await screen.findAllByTestId('planet');

    waitFor(() => expect(planets).toHaveLength(8));
    
    userEvent.selectOptions(inputColumn, ['population']);
    console.debug()
    userEvent.selectOptions(inputComparison, ['menor que']);
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '30000000' );
    userEvent.click(inputButton);

    
    // const planets2 = await screen.getAllByTestId('planet');
    waitFor(() => expect(planets).toHaveLength(2));

    const filter1 = screen.getByTestId('rotation_period');
    const filter2 = screen.getByTestId('population');
    
    userEvent.click(filter1);
    // const planets3 = await screen.getAllByTestId('planet');
    waitFor(() => expect(planets).toHaveLength(3));
    

    userEvent.click(filter2);
    // const planets4 = await screen.getAllByTestId('planet');
    waitFor(() => expect(planets).toHaveLength(10));

});



  // test('Testa a aplicação após usar filtros numéricos', async () => {
  //   const inputColumn = screen.getByTestId('column-filter');
  //   const inputComparison = screen.getByTestId('comparison-filter');
  //   const inputValue = screen.getByTestId('value-filter');
  //   const inputButton = screen.getByTestId('button-filter');
    
  //   // inputColumn.map((iC) => expect(iC).toBeInTheDocument())
  //   expect(inputComparison).toBeInTheDocument();
  //   expect(inputValue).toBeInTheDocument();
  //   expect(inputButton).toBeInTheDocument();
    
  //   userEvent.selectOptions(inputColumn, ['rotation_period']);
  //   userEvent.selectOptions(inputComparison, ['maior que']);
  //   userEvent.type(inputValue, '20' );
  //   userEvent.click(inputButton);

  //   const planets = await screen.findAllByTestId('planet');

  //   waitFor(() => expect(planets).toHaveLength(8));
    
  //   userEvent.selectOptions(inputColumn, ['population']);
  //   userEvent.selectOptions(inputComparison, ['menor que']);
  //   userEvent.clear(inputValue);
  //   userEvent.type(inputValue, '30000000' );
    
  //   const planets2 = await screen.getAllByTestId('planet');
  //   waitFor(() => expect(planets2).toHaveLength(2));

  //   const filter1 = screen.getByTestId('rotation_period');
  //   const filter2 = screen.getByTestId('population');
    
  //   userEvent.click(filter1);
  //   const planets3 = await screen.getAllByTestId('planet');
  //   waitFor(() => expect(planets3).toHaveLength(3));
    

  //   userEvent.click(filter2);
  //   const planets4 = await screen.getAllByTestId('planet');
  //   waitFor(() => expect(planets4).toHaveLength(10));

    
  // });
})

