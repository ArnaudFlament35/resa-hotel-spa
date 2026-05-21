<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class PriceController extends AbstractController
{
    /**
     * Retourne les prix disponibles pour une période donnée.
     * Utilisé par les sites partenaires pour afficher les tarifs.
     */
    #[Route('/prices', name: 'prices', methods: ['GET'])]
    public function getPrices(Request $request): JsonResponse
    {
        $checkIn  = $request->query->get('check_in');
        $checkOut = $request->query->get('check_out');
        $adults   = $request->query->getInt('adults', 2);
        $hotelId  = $request->query->get('hotel_id');

        if (!$checkIn || !$checkOut) {
            return $this->json([
                'error' => 'Les paramètres check_in et check_out sont requis.',
            ], 400);
        }

        // TODO: requêter la disponibilité réelle en BDD
        $prices = [
            [
                'hotel_id'     => $hotelId ?? 1,
                'room_type'    => 'Chambre Standard',
                'price_per_night' => 120.00,
                'currency'     => 'EUR',
                'available'    => true,
            ],
        ];

        return $this->json([
            'check_in'  => $checkIn,
            'check_out' => $checkOut,
            'adults'    => $adults,
            'results'   => $prices,
        ]);
    }

    /**
     * Retourne la liste des hôtels et résidences disponibles via API.
     */
    #[Route('/hotels', name: 'hotels', methods: ['GET'])]
    public function getHotels(): JsonResponse
    {
        // TODO: récupérer depuis la BDD
        return $this->json([
            'data' => [],
            'meta' => ['total' => 0],
        ]);
    }

    /**
     * Retourne les soins spa/thalasso disponibles.
     */
    #[Route('/soins', name: 'spa_treatments', methods: ['GET'])]
    public function getSpaTreatments(Request $request): JsonResponse
    {
        $hotelId = $request->query->get('hotel_id');
        $type    = $request->query->get('type', 'all'); // 'spa', 'thalasso', 'all'

        // TODO: récupérer depuis la BDD
        return $this->json([
            'hotel_id' => $hotelId,
            'type'     => $type,
            'data'     => [],
        ]);
    }
}
