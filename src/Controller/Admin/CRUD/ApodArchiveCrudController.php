<?php

namespace App\Controller\Admin\CRUD;

use App\Entity\ApodArchive;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ApodArchiveCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return ApodArchive::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [

            TextField::new('title'),
            ImageField::new('url'),
            DateField::new('date'),
            DateField::new('dateSaved')

        ];
    }

}
