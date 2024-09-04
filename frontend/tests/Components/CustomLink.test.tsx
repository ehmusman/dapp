import React from 'react'
import { render, screen } from "@testing-library/react";
import CustomLink from '../../app/components/CustomLink';

describe("CustomLink Component", () => {

    it("should display the default value when there are no props passed", () => {
      render(<CustomLink />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent(/Login/i);
      expect(link).toHaveAttribute('href', '/login');
    });
  
    it("should display the correct text when 'text' prop is passed", () => {
      render(<CustomLink text="Sign Up" />);
      const link = screen.getByRole('link');
      expect(link).toHaveTextContent(/Sign Up/i);
    });
  
    it("should navigate to the correct href when 'href' prop is passed", () => {
      render(<CustomLink href="signup" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/signup');
    });
  
  
    it("should render an anchor element with the correct role", () => {
      render(<CustomLink />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  
  });