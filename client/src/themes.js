import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#FFF',
  text: '#000',
  toggleBorder: '#FFF',
  background: '#363537',
  formBg: '#f9f9f9',
  inputBorder: '#ccc',
  inputFocusBorder: '#6B8096',
  buttonBg: '#6B8096',
  buttonText: '#FFF',
  buttonHoverBg: '#5a6d7b',
};

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
  formBg: '#3b3b3b',
  inputBorder: '#555',
  inputFocusBorder: '#999',
  buttonBg: '#999',
  buttonText: '#000',
  buttonHoverBg: '#7a7a7a',
};

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    transition: all 0.50s linear;
  }

  .register {
    background-color: ${({ theme }) => theme.formBg};
  }

  .register input {
    border: 1px solid ${({ theme }) => theme.inputBorder};
  }

  .register input:focus {
    border-color: ${({ theme }) => theme.inputFocusBorder};
  }

  .button_common {
    background-color: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonText};
  }

  .button_common:hover {
    background-color: ${({ theme }) => theme.buttonHoverBg};
  }
`;
