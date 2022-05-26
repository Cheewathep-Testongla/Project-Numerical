import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import React from "react";

test("Test Build", () => {
  render(<App />);
});

test('Show Chapter', () => {
  render(<App />);
  expect(screen.getByText('Bisection')).toBeInTheDocument();
  expect(screen.getByText('False Position Method')).toBeInTheDocument();
  expect(screen.getByText('One Point Iteration')).toBeInTheDocument();
  expect(screen.getByText('Newton Raphson')).toBeInTheDocument();
  expect(screen.getByText('Secant Method')).toBeInTheDocument();
  expect(screen.getByText("Cramer's Rule")).toBeInTheDocument();
  expect(screen.getByText('Gauss Elimination')).toBeInTheDocument();
  expect(screen.getByText('Gauss Jordan')).toBeInTheDocument();
  expect(screen.getByText('LU Decomposition Method')).toBeInTheDocument();
  expect(screen.getByText('Jacobi Iteration')).toBeInTheDocument();
  expect(screen.getByText('Gauss Seidel Iteration')).toBeInTheDocument();
  expect(screen.getByText('Conjugate Gradient Method')).toBeInTheDocument();
  expect(screen.getByText("Newton's Divided Differences")).toBeInTheDocument();
  expect(screen.getByText('Lagrange Interpolation')).toBeInTheDocument();
  expect(screen.getByText('Spline')).toBeInTheDocument();
  expect(screen.getByText('Linear Regression')).toBeInTheDocument();
  expect(screen.getByText('Polynomial Regression')).toBeInTheDocument();
  expect(screen.getByText('Multiple Linear Regression')).toBeInTheDocument();
  expect(screen.getByText("Single Trapezoidal Rule")).toBeInTheDocument();
  expect(screen.getByText('Composite Trapezoidal Rule')).toBeInTheDocument();
  expect(screen.getByText("Simpson's Rule")).toBeInTheDocument();
  expect(screen.getByText("Composite Simpson's Rule")).toBeInTheDocument();
  expect(screen.getByText('Polynomial Regression')).toBeInTheDocument();
  expect(screen.getByText('Numerical Differentiation')).toBeInTheDocument();
});

// Test Function
test('Show Login Input', () => {
  render(<App />);
  const UserName = screen.getByTestId("UserName");
  const Password = screen.getByTestId("Password");
  expect(UserName).toHaveAttribute("type","text");
  expect(Password).toHaveAttribute("type","password");
});

test('Check User', () => {
  render(<App />);
  expect(screen.getByText('Guest User')).toBeInTheDocument();
});

test('Check Login', async () => {
  render(<App />);
  const UserName = screen.getByTestId("UserName");
  const Password = screen.getByTestId("Password");
  const Submit_Login = screen.getByTestId('Submit_Login');

  fireEvent.change(UserName, {
    target: 
      {
        value: "s620406216049@email.kmutnb.ac.th"
      }
  });
  
  fireEvent.change(Password, {
    target: 
      {
        value: "55555"
      }
  });
  
  expect(Submit_Login).toBeInTheDocument();

  fireEvent.submit(Submit_Login);

  const requestLogin = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      { 
        email: "s620406216049@email.kmutnb.ac.th",
        password: "55555" 
      })
  };

  await fetch('https://numericalbackend.herokuapp.com/login', requestLogin)
      .then(resp => resp.json())
      .then(Token => {
        expect(Token).toBeDefined();
      })

  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  await waitFor(() => {
    expect(UserName).not.toBeInTheDocument();
    expect(Password).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("Welcome To Website Numerical Method Calculator")).toBeInTheDocument();
  });
});


test('Test Example Equation And Answer', async () => {
  render(<App />);
  const UserName = screen.getByTestId("UserName");
  const Password = screen.getByTestId("Password");
  const Submit_Login = screen.getByTestId('Submit_Login');

  fireEvent.change(UserName, {
    target: 
      {
        value: "s620406216049@email.kmutnb.ac.th"
      }
  });
  
  fireEvent.change(Password, {
    target: 
      {
        value: "55555"
      }
  });
  
  expect(Submit_Login).toBeInTheDocument();

  fireEvent.submit(Submit_Login);

  const requestLogin = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      { 
        email: "s620406216049@email.kmutnb.ac.th",
        password: "55555" 
      })
  };

  await fetch('https://numericalbackend.herokuapp.com/login', requestLogin)
      .then(resp => resp.json())
      .then(Token => {
        expect(Token).toBeDefined();
      })

  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  await waitFor(() => {
    expect(UserName).not.toBeInTheDocument();
    expect(Password).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("Welcome To Website Numerical Method Calculator")).toBeInTheDocument();
  });

  const Root_Of_Equation = screen.getByTestId('Root_Of_Equation');
  const Bisection = screen.getByTestId('Bisection');

  fireEvent.click(Root_Of_Equation);

  await waitFor(() => {
    expect(screen.getByText('Bisection')).toBeInTheDocument();
  });

  fireEvent.click(Bisection);

  await waitFor(() => {
    expect(screen.getByText("Bisection Method")).toBeInTheDocument();
  });

  const BisectionAPI = screen.getByTestId("BisectionAPI");

  fireEvent.change(BisectionAPI);

  await waitFor(() => {
    expect(screen.getByText("(43*x)-1")).toBeInTheDocument();
    expect(screen.getByText("(x^2)-3")).toBeInTheDocument();
    expect(screen.getByText("(x^4)-13")).toBeInTheDocument();
    expect(screen.getByText("x-1")).toBeInTheDocument();
    expect(screen.getByText("(x^2)+(51*x)+50")).toBeInTheDocument();
    expect(screen.getByText("(x^2)+(9*x)-10")).toBeInTheDocument();
  });

  fireEvent.change(screen.getByTestId("BisectionEquation"), 
    {
      target: {value: "(43*x)-1"}
    }
  );

  fireEvent.change(screen.getByTestId("BisectionLeft"), 
    {
    target: {value: "0.02"}
    }
  );

  fireEvent.change(screen.getByTestId("BisectionRight"),
    {
     target: {value: "0.03"}
    }
  );
 
  fireEvent.submit(screen.getByTestId("BisectionSubmit")); 

  await expect(screen.getByText("Answer : 0.023255825042724606")).toBeInTheDocument();

});
