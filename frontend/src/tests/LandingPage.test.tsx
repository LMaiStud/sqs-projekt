import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../LandingPage';


    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('rendert ohne Fehler', () => {
        render(<LandingPage />);
        // Beispielhafte Assertion - anpassen nach Bedarf
        expect(screen.getByLabelText('Suche')).toBeInTheDocument();
    });

it('zeigt den Titel korrekt an', () => {
    render(<LandingPage />);
    expect(screen.getByText('Beste Autobaustellenauskunft')).toBeInTheDocument();
});

it('zeigt die Suche korrekt an', () => {
    render(<LandingPage />);
    expect(screen.getByText('Bitte Baustelle Suchen!')).toBeInTheDocument();
});

it('zeigt den Button Suche korrekt an', () => {
    render(<LandingPage />);
    const buttonElement = screen.getByRole('button', { name: 'Suche' });
    expect(buttonElement).toBeInTheDocument();
});


