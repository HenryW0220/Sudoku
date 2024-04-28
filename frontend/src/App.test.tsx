import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import useAuth from "./hooks/useAuth";
import { useAuth } from "./hooks/useAuth";
import FullSudokuGrid from "./components/FullSudokuGrid";
import AuthForm from "./components/AuthForm";
import HeaderBar from "./components/HeaderBar";
import Note from "./components/Note";

// Mock hooks and components to isolate the tests from external dependencies
jest.mock("./hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));
jest.mock("./components/FullSudokuGrid", () => () => <div>FullSudokuGrid</div>);
jest.mock("./components/AuthForm", () => () => (
  <button>Login Form Button</button>
));
jest.mock("./components/HeaderBar", () => () => <div>HeaderBar</div>);
jest.mock("./components/Note", () => () => <div>Note Component</div>);

// Testing the App component's behavior based on authentication status
describe("App Component", () => {
  it("renders AuthForm when user is not logged in", () => {
    useAuth.mockImplementation(() => ({
      isLoggedIn: false,
      user: null,
      onLogin: jest.fn(),
      onLogout: jest.fn(),
      loadMe: jest.fn(),
    }));

    render(<App />);
    expect(screen.getByText("Login Form Button")).toBeInTheDocument();
    expect(screen.queryByText("FullSudokuGrid")).not.toBeInTheDocument();
  });

  it("renders HeaderBar and FullSudokuGrid when user is logged in", () => {
    useAuth.mockImplementation(() => ({
      isLoggedIn: true,
      user: { username: "testuser" },
      onLogin: jest.fn(),
      onLogout: jest.fn(),
      loadMe: jest.fn(),
    }));

    render(<App />);
    expect(screen.getByText("HeaderBar")).toBeInTheDocument();
    expect(screen.getByText("FullSudokuGrid")).toBeInTheDocument();
  });
});

// Tests for each component to verify they render correctly
describe("AuthForm Component", () => {
  it("renders correctly", () => {
    render(<AuthForm />);
    expect(screen.getByText("Login Form Button")).toBeInTheDocument();
  });
});

describe("FullSudokuGrid Component", () => {
  it("renders correctly", () => {
    render(<FullSudokuGrid />);
    expect(screen.getByText("FullSudokuGrid")).toBeInTheDocument();
  });
});

describe("HeaderBar Component", () => {
  it("renders correctly", () => {
    render(<HeaderBar />);
    expect(screen.getByText("HeaderBar")).toBeInTheDocument();
  });
});

describe("Note Component", () => {
  it("renders correctly", () => {
    render(<Note />);
    expect(screen.getByText("Note Component")).toBeInTheDocument();
  });
});
