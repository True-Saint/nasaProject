<?php

namespace App\Controller;

use DateTime;
use App\Entity\ApodArchive;
use App\Utils\MailerService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpClient\HttpClient;

class HomeController extends AbstractController
{


    public function index(){
        return $this->render('default/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);

    }

    /**
     * @Route("/home", name="home")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function home(){


    }

    public function checkAPOD(){

        $apod = new ApodArchive();
        $apodRepo = $this->getDoctrine()->getRepository(ApodArchive::class);
     //   $apodArchiveData = $apodRepo->findOneBy(['dateSaved' => new DateTime('now')]);

        $client = HttpClient::create();
        $response = $client->request('GET', 'http://localhost:8000/api/apod');

        $a= new \stdClass();
        $a->data = array();
        $x = array();

        $statusCode = $response->getStatusCode();
        // $statusCode = 200
        $contentType = $response->getHeaders()['content-type'][0];
        // $contentType = 'application/json'
        $content = $response->getContent();
        // $content = '{"id":521583, "name":"symfony-docs", ...}'
        $content = $response->toArray();
        array_push($x,$content);

        $a = (object)$x;
        return new JsonResponse($x);

        return $apodArchiveData;
    }

    public function autoCheckAPI()
    {

    }

}