<?php

namespace App\Controller\Frontend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/reservation', name: 'frontend_booking_')]
class BookingController extends AbstractController
{
    #[Route('', name: 'index')]
    public function index(): Response
    {
        return $this->render('frontend/booking/search.html.twig', [
            'page_title' => 'Recherche de disponibilités',
        ]);
    }

    #[Route('/resultats', name: 'results', methods: ['GET', 'POST'])]
    public function results(Request $_request): Response
    {
        // TODO: récupérer les établissements disponibles selon les critères
        return $this->render('frontend/booking/results.html.twig', [
            'page_title' => 'Résultats de recherche',
            'results'    => [],
        ]);
    }

    #[Route('/sejour/{slug}', name: 'stay')]
    public function stay(string $slug): Response
    {
        // TODO: récupérer le séjour par slug
        return $this->render('frontend/booking/stay.html.twig', [
            'page_title' => 'Détail du séjour',
            'slug'       => $slug,
        ]);
    }

    #[Route('/panier', name: 'cart')]
    public function cart(): Response
    {
        return $this->render('frontend/booking/cart.html.twig', [
            'page_title' => 'Votre panier',
        ]);
    }

    #[Route('/confirmation', name: 'confirm', methods: ['POST'])]
    public function confirm(Request $_request): Response
    {
        // TODO: valider la réservation et créer le devis
        return $this->render('frontend/booking/confirmation.html.twig', [
            'page_title' => 'Confirmation de réservation',
        ]);
    }
}
