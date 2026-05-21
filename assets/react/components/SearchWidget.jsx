/**
 * Widget de recherche rapide affiché sur la page d'accueil.
 * Permet une saisie rapide des dates et redirige vers la recherche.
 */
import React, { useState } from 'react';

export default function SearchWidget() {
    const today = new Date().toISOString().split('T')[0];
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adults, setAdults] = useState(2);

    function handleSubmit(e) {
        e.preventDefault();
        const params = new URLSearchParams({ check_in: checkIn, check_out: checkOut, adults });
        window.location.href = `/reservation/resultats?${params}`;
    }

    return (
        <div className="search-widget">
            <h2>Rechercher un séjour</h2>
            <form onSubmit={handleSubmit} className="search-widget-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="sw-check-in">Arrivée</label>
                        <input
                            id="sw-check-in"
                            type="date"
                            className="form-control"
                            min={today}
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sw-check-out">Départ</label>
                        <input
                            id="sw-check-out"
                            type="date"
                            className="form-control"
                            min={checkIn || today}
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sw-adults">Adultes</label>
                        <select
                            id="sw-adults"
                            className="form-control"
                            value={adults}
                            onChange={(e) => setAdults(Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    Rechercher les disponibilités
                </button>
            </form>
        </div>
    );
}
