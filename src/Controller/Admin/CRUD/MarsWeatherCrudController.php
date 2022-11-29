<?php

namespace App\Controller\Admin\CRUD;

use App\Entity\MarsWeather;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class MarsWeatherCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return MarsWeather::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
