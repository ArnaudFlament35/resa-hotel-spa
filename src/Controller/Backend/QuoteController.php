<?php

namespace App\Controller\Backend;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
#[Route('/admin/devis', name: 'backend_quote_')]
class QuoteController extends AbstractController
{
    #[Route('', name: 'index')]
    public function index(): Response
    {
        return $this->render('backend/pages/quotes/index.html.twig', [
            'page_title' => 'Gestion des devis',
            'quotes'     => [],
        ]);
    }

    #[Route('/nouveau', name: 'new', methods: ['GET', 'POST'])]
    public function new(Request $_request): Response
    {
        // TODO: créer un nouveau devis
        return $this->render('backend/pages/quotes/form.html.twig', [
            'page_title' => 'Nouveau devis',
        ]);
    }

    #[Route('/{id}', name: 'show')]
    public function show(int $id): Response
    {
        // TODO: récupérer le devis
        return $this->render('backend/pages/quotes/show.html.twig', [
            'page_title' => 'Devis #'.$id,
            'id'         => $id,
        ]);
    }

    #[Route('/{id}/contrat', name: 'to_contract', methods: ['POST'])]
    public function toContract(int $id): Response
    {
        // TODO: transformer le devis en contrat
        $this->addFlash('success', 'Devis #'.$id.' converti en contrat.');

        return $this->redirectToRoute('backend_quote_show', ['id' => $id]);
    }

    #[Route('/{id}/pdf', name: 'pdf')]
    public function pdf(int $id): Response
    {
        // TODO: générer le PDF du devis
        return new Response('PDF bientôt disponible', 200, [
            'Content-Type' => 'text/plain',
        ]);
    }
}
