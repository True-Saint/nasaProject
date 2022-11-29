<?php

namespace App\Repository;

use App\Entity\ApodArchive;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ApodArchive|null find($id, $lockMode = null, $lockVersion = null)
 * @method ApodArchive|null findOneBy(array $criteria, array $orderBy = null)
 * @method ApodArchive[]    findAll()
 * @method ApodArchive[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ApodArchiveRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ApodArchive::class);
    }

    // /**
    //  * @return ApodArchive[] Returns an array of ApodArchive objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ApodArchive
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
