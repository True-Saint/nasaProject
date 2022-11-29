<?php

namespace App\Repository;

use App\Entity\MarsWeather;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MarsWeather|null find($id, $lockMode = null, $lockVersion = null)
 * @method MarsWeather|null findOneBy(array $criteria, array $orderBy = null)
 * @method MarsWeather[]    findAll()
 * @method MarsWeather[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MarsWeatherRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MarsWeather::class);
    }

    // /**
    //  * @return MarsWeather[] Returns an array of MarsWeather objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MarsWeather
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
