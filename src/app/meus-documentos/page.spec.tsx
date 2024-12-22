/* eslint-disable react/display-name */ // Desabilitar regra de exibição de componentes anônimos
import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import PetManagement from './page'

// Opcional: Mock de componentes filhos se necessário
jest.mock('./PetsForm/PetsForm', () => () => <div data-testid="petsForm"></div>)
jest.mock('./PetsTable/PetsTable', () => () => (
  <div data-testid="petsTable"></div>
))

describe('PetManagement Page', () => {
  it('deve renderizar a página de gerenciamento de pets e seus componentes', () => {
    // Renderizar a página no ambiente de teste
    render(<PetManagement />)

    // Verificar se os componentes filhos estão presentes
    expect(screen.getByTestId('petsForm')).toBeInTheDocument()
    expect(screen.getByTestId('petsTable')).toBeInTheDocument()
  })
})
