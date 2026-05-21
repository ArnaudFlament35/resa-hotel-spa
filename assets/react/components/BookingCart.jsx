/**
 * Tunnel de commande React — gère le panier et le formulaire de confirmation.
 * Les données du panier sont stockées dans sessionStorage.
 */
import React, { useState, useEffect } from 'react';

const CART_KEY = 'resa_cart';

export default function BookingCart({ confirmUrl }) {
    const [cart, setCart] = useState([]);
    const [step, setStep] = useState(1); // 1: panier, 2: coordonnées, 3: confirmation
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const saved = sessionStorage.getItem(CART_KEY);
        if (saved) {
            try { setCart(JSON.parse(saved)); } catch {}
        }
    }, []);

    const total = cart.reduce((sum, item) => sum + (item.price ?? 0), 0);

    function removeItem(index) {
        const updated = cart.filter((_, i) => i !== index);
        setCart(updated);
        sessionStorage.setItem(CART_KEY, JSON.stringify(updated));
    }

    function handleChange(e) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleConfirm(e) {
        e.preventDefault();
        const res = await fetch(confirmUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart, customer: formData }),
        });
        if (res.ok) {
            sessionStorage.removeItem(CART_KEY);
            setStep(3);
        }
    }

    if (step === 3) {
        return (
            <div className="cart-step cart-confirmed">
                <h2>Réservation confirmée !</h2>
                <p>Un email de confirmation a été envoyé à <strong>{formData.email}</strong>.</p>
            </div>
        );
    }

    return (
        <div className="booking-cart">
            <div className="steps-indicator">
                <span className={step === 1 ? 'active' : ''}>1. Récapitulatif</span>
                <span className={step === 2 ? 'active' : ''}>2. Vos coordonnées</span>
                <span className={step === 3 ? 'active' : ''}>3. Confirmation</span>
            </div>

            {step === 1 && (
                <div className="cart-step">
                    <h2>Votre sélection</h2>
                    {cart.length === 0 ? (
                        <p>Votre panier est vide. <a href="/reservation">Rechercher un séjour</a></p>
                    ) : (
                        <>
                            {cart.map((item, i) => (
                                <div key={i} className="cart-item">
                                    <div>
                                        <strong>{item.name}</strong>
                                        <p>{item.dates}</p>
                                    </div>
                                    <div>
                                        <span>{item.price} €</span>
                                        <button onClick={() => removeItem(i)} className="btn btn-sm btn-outline-danger">
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="cart-total">
                                <strong>Total : {total.toFixed(2)} €</strong>
                            </div>
                            <button onClick={() => setStep(2)} className="btn btn-primary">
                                Continuer
                            </button>
                        </>
                    )}
                </div>
            )}

            {step === 2 && (
                <div className="cart-step">
                    <h2>Vos coordonnées</h2>
                    <form onSubmit={handleConfirm}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Prénom</label>
                                <input type="text" name="firstName" className="form-control"
                                       value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Nom</label>
                                <input type="text" name="lastName" className="form-control"
                                       value={formData.lastName} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control"
                                   value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Téléphone</label>
                            <input type="tel" name="phone" className="form-control"
                                   value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">
                                Retour
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Confirmer la réservation — {total.toFixed(2)} €
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
