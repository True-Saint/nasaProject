<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private const USERS = [
        [
            'username' => 'admin',
            'roles' => [User::ROLE_SUPERADMIN],
            'password' => 'Test123'
        ],
        [
            'username' => 'admin2',
            'roles' => [User::ROLE_COMMENTATOR],
            'password' => 'admin'
        ]

    ];

    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    /*
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername('admin');

        $password = $this->hasher->hashPassword($user, 'pass_1234');
        $user->setPassword($password);

        $manager->persist($user);
        $manager->flush();
    }*/

    /**
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $this->loadUsers($manager);
    }

    public function loadUsers(ObjectManager $manager)
    {
        foreach (self::USERS as $userFixture) {
            $user = new User();
            $user->setUsername($userFixture['username']);
            $user->setRoles($userFixture['roles']);
            $user->setPassword(
                $this->hasher->hashPassword(
                    $user,
                    $userFixture['password']
                )
            );

            $manager->persist($user);
        }
        $manager->flush();

    }

}
