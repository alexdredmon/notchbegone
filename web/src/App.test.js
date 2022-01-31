import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';


test('app renders initial state', () => {
  render(<App />);
  const logo = screen.getByAltText("Notch Be Gone")
  expect(logo).toBeInTheDocument()
  const title = screen.getByAltText("Free notchless background generator")
  expect(title).toBeInTheDocument()
  const upload = screen.getByTitle("Upload an image")
  expect(upload).toBeInTheDocument()
})

test('can select an image', async () => {
  render(<App />)

  const upload = screen.getByTitle("Upload an image")
  expect(upload).toBeInTheDocument()

  let mockFileSelect = screen.getByTitle("Mock File Select")
  mockFileSelect.click()

  const generate = screen.getByTitle("Generate Background")
  expect(generate).toBeInTheDocument()
})

test('can select device and model', async () => {
  render(<App />)

  let mockFileSelect = screen.getByTitle("Mock File Select")
  mockFileSelect.click()
  
  const device = screen.getByText("Device:")
  expect(device).toBeInTheDocument()

  const phone = screen.getByTestId("toggle-option-phone")
  expect(phone).toBeInTheDocument()
  phone.click()

  const phoneModels = ['13', '12', '11']
  phoneModels.forEach(each => {
    let model = screen.getByText(each)
    expect(model).toBeInTheDocument()
  })

  const laptop = screen.getByTestId("toggle-option-laptop")
  expect(laptop).toBeInTheDocument()
  laptop.click()

  const laptopModel = ['14"', '16"']
  laptopModel.forEach(each => {
    let model = screen.getByText(each)
    expect(model).toBeInTheDocument()
  })
})
