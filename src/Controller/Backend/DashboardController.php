<?php

namespace App\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/admin', name: 'backend_')]
class DashboardController extends AbstractController
{
    #[Route('', name: 'dashboard')]
    #[IsGranted('ROLE_ADMIN')]
    public function index(): Response
    {
        return $this->render('backend/pages/dashboard.html.twig', [
            'page_title' => 'Tableau de bord',
        ]);
    }

    #[Route('/login', name: 'login')]
    public function login(): Response
    {
        return $this->render('backend/pages/login.html.twig');
    }

    #[Route('/logout', name: 'logout', methods: ['POST'])]
    public function logout(): never
    {
        throw new \LogicException('Cette route est interceptée par le firewall.');
    }
}
