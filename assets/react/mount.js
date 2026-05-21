/**
 * Système de montage automatique des composants React.
 *
 * Dans les templates Twig, ajouter un div avec data-component="NomDuComposant".
 * Ce script scanne la page et monte le bon composant React sur chaque div trouvé.
 *
 * Exemple dans Twig :
 *   <div id="mon-composant" data-component="BookingSearch" data-results-url="/api/..."></div>
 */
import React from 'react';
import { createRoot } from 'react-dom/client';

// Import de tous les composants React disponibles
import BookingSearch from './components/BookingSearch';
import BookingCart from './components/BookingCart';
import SearchWidget from './components/SearchWidget';

// Registre des composants : nom (string) → composant React
const COMPONENTS = {
    BookingSearch,
    BookingCart,
    SearchWidget,
};

export function mountComponents() {
    const elements = document.querySelectorAll('[data-component]');

    elements.forEach((el) => {
        const componentName = el.dataset.component;
        const Component = COMPONENTS[componentName];

        if (!Component) {
            console.warn(`Composant React inconnu : "${componentName}"`);
            return;
        }

        // Passer tous les data-attributes au composant en tant que props
        const props = { ...el.dataset };
        delete props.component; // on ne passe pas "component" comme prop

        const root = createRoot(el);
        root.render(React.createElement(Component, props));
    });
}
