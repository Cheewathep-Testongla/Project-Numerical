import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import React from "react";

test("renders learn react link", () => {
  render(<App />);
});

test('render Log in', () => {
  render(<App />);
  const UserName = screen.getByTestId("UserName");
  const Password = screen.getByTestId("Password");
  expect(UserName).toHaveAttribute("type","text");
  expect(Password).toHaveAttribute("type","password");
});

it('Check Guest User', () => {
  render(<App />);
  expect(screen.getByText('Guest User')).toBeInTheDocument();
});

it('Already Log in',async () => {
  render(<App />);
  const UserName = screen.getByTestId("UserName");
  const Password = screen.getByTestId("Password");
  await fetch('http://localhost:3001/User')
  .then((resp) => (resp).json())
  .then((GetAccount) => {
    if(GetAccount[0].email === UserName.getByText && GetAccount[0].password === Password.getByText )
    {
      expect(screen.getByText('Welcome To Website Numerical Method Calculator')).toBeInTheDocument();
    }
    else
    {
      expect(screen.getByText('Please Log in To used website')).toBeInTheDocument();
    }
  });
})

it('Show Chapter', async () => {
  render(<App />);
  const UserName = screen.getByTestId("UserName");
  const Password = screen.getByTestId("Password");
  await fetch('http://localhost:3001/User')
  .then((resp) => (resp).json())
  .then((GetAccount) => {
    if(GetAccount[0].email === UserName.getByText && GetAccount[0].password === Password.getByText )
    {
      expect(screen.getByText('Bisection Method')).toBeInTheDocument();
      expect(screen.getByText('False Position Method')).toBeInTheDocument();
      expect(screen.getByText('One Point Iteration')).toBeInTheDocument();
      expect(screen.getByText('Newton Raphson')).toBeInTheDocument();
      expect(screen.getByText('Secant Method')).toBeInTheDocument();
      expect(screen.getByText("Cramer's Rule")).toBeInTheDocument();
      expect(screen.getByText('Gauss Elimination Method')).toBeInTheDocument();
      expect(screen.getByText('Gauss Jordan')).toBeInTheDocument();
      expect(screen.getByText('Jacobi Iteration')).toBeInTheDocument();
      expect(screen.getByText('Gauss Seidel Iteration')).toBeInTheDocument();
      expect(screen.getByText('Conjugate Gradient')).toBeInTheDocument();
    }
    else
    {
      expect(screen.getByText('Please Log in To used website')).toBeInTheDocument();
    }
  });

  // const UserName = screen.getByTestId("UserName");
  // const Password = screen.getByTestId("Password");
  // await fetch('http://localhost:3001/User')
  // .then((resp) => (resp).json())
  // .then((GetAccount) => {
  //   if(GetAccount[0].email === UserName.getByText && GetAccount[0].password === Password.getByText )
  //   {
  //     expect(screen.getByText('Welcome To Website Numerical Method Calculator')).toBeInTheDocument();
  //   }
  //   else
  //   {
  //     expect(screen.getByText('Please Log in To used website')).toBeInTheDocument();
  //   }
  // });
})