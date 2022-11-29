<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\security\TokenGenerator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

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
            'password' => 'Test123'
        ]

    ];
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    /**
     * @var \Faker\Factory
     */
    private $faker;


    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {

        $this->passwordEncoder = $passwordEncoder;
        $this->faker = \Faker\Factory::create();
    }

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
                $this->passwordEncoder->encodePassword(
                    $user,
                    $userFixture['password']
                )
            );

            $manager->persist($user);
        }
        $manager->flush();

    }

}
