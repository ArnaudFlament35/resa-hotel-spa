<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    /**
     * Les rôles sont stockés en JSON en BDD.
     * Exemple : ["ROLE_ADMIN"] ou ["ROLE_USER"]
     *
     * @var list<string>
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * Le mot de passe HACHÉ (jamais le mot de passe en clair).
     */
    #[ORM\Column]
    private ?string $password = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * L'identifiant unique utilisé par Symfony Security pour reconnaître l'utilisateur.
     * On utilise l'email.
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * Renvoie les rôles de l'utilisateur.
     * ROLE_USER est toujours ajouté automatiquement (bonne pratique Symfony).
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Appelé par Symfony après authentification pour effacer les données sensibles temporaires.
     * Pas utile ici car on ne stocke rien en mémoire, mais requis par l'interface.
     */
    public function eraseCredentials(): void
    {
    }
}
