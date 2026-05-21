/**
 * Formulaire de recherche de disponibilités — page /reservation.
 * Appelle l'API Symfony pour afficher les résultats sans rechargement.
 */
import React, { useState } from 'react';

export default function BookingSearch({ resultsUrl }) {
    const today = new Date().toISOString().split('T')[0];
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [form, setForm] = useState({
        check_in: '',
        check_out: '',
        adults: 2,
        type: 'all', // 'hotel', 'spa', 'sejour', 'all'
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResults(null);

        try {
            const params = new URLSearchParams(form);
            const res = await fetch(`/api/prices?${params}`);
            const data = await res.json();
            setResults(data.results ?? []);
        } catch (err) {
            console.error('Erreur lors de la recherche', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="booking-search">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Arrivée</label>
                        <input type="date" name="check_in" className="form-control"
                               min={today} value={form.check_in} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Départ</label>
                        <input type="date" name="check_out" className="form-control"
                               min={form.check_in || today} value={form.check_out} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Adultes</label>
                        <select name="adults" className="form-control" value={form.adults} onChange={handleChange}>
                            {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select name="type" className="form-control" value={form.type} onChange={handleChange}>
                            <option value="all">Tout</option>
                            <option value="hotel">Hôtel uniquement</option>
                            <option value="spa">Spa / Thalasso</option>
                            <option value="sejour">Séjour complet</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Recherche...' : 'Rechercher'}
                </button>
            </form>

            {results !== null && (
                <div className="search-results">
                    {results.length === 0 ? (
                        <p className="alert alert-info">Aucune disponibilité pour ces critères.</p>
                    ) : (
                        <div className="results-grid">
                            {results.map((item, i) => (
                                <div key={i} className="result-card">
                                    <h3>{item.room_type}</h3>
                                    <p>{item.price_per_night} {item.currency} / nuit</p>
                                    <span className={`badge ${item.available ? 'badge-success' : 'badge-danger'}`}>
                                        {item.available ? 'Disponible' : 'Complet'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
