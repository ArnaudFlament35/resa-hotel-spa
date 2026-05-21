<?php

namespace App\Controller\Frontend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/', name: 'frontend_')]
class HomeController extends AbstractController
{
    #[Route('', name: 'home')]
    public function index(): Response
    {
        return $this->render('frontend/pages/home.html.twig', [
            'page_title' => 'Bienvenue - Réservation Hôtel & Spa',
        ]);
    }

    #[Route('/login', name: 'login')]
    public function login(): Response
    {
        return $this->render('frontend/pages/login.html.twig');
    }

    #[Route('/logout', name: 'logout', methods: ['POST'])]
    public function logout(): never
    {
        // Géré par le firewall Symfony
        throw new \LogicException('Cette route est interceptée par le firewall.');
    }
}
