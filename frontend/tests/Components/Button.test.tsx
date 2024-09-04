import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Button from '../../app/components/Button';

describe("Button Component", () => {

  it("should display the default title when no props are passed", () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Logout/i);
  });

  it("should use the correct button type when 'type' prop is passed", () => {
    render(<Button type="submit" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it("should display the correct title when 'title' prop is passed", () => {
    render(<Button title="Login" />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/Login/i);
  });

  it("should apply the correct class when 'className' prop is passed", () => {
    render(<Button className="custom-button-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-button-class');
  });

  it("should apply loading class and disable the button when 'isLoading' is true", () => {
    render(
      <Button
        isLoading={true}
        loadingClassName="loading-spinner"
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('loading-spinner');
  });

  it("should not apply loading class or disable the button when 'isLoading' is false", () => {
    render(
      <Button
        isLoading={false}
        loadingClassName="loading-spinner"
      />
    );
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveClass('loading-spinner');
  });

  it("should call the onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call the onClick handler when button is disabled", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} isLoading={true} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

});
