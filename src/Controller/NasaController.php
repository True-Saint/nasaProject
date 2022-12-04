<?php

namespace App\Controller;


use App\Entity\ApodArchive;
use App\Entity\MarsWeather;
use Doctrine\Persistence\ManagerRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Attribute\AttributeBag;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\Storage\NativeSessionStorage;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use DateTime;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class NasaController extends AbstractController
{
    public function __construct(TokenStorageInterface $tokenStorageInterface, JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
    }

    /**
     * @Route("/auth", name="auth")
     */
    public function authenticateToken( ){


    }

    /**
     * @Route("/Nasa", name="Nasa")
     */
    public function index()
    {
        $data = $this->getAPOD();

        return $this->render('apod/index.html.twig', [
            'controller_name' => 'NasaController',
            'data' => $data,
        ]);


    }


    /**
     * @Route("api/apod", name="apodApi")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getAPOD(){

        $key = $this->getParameter('nasa_api_key');

        $APODUrl = 'https://api.nasa.gov/planetary/apod?api_key=';

        $client = HttpClient::create();
        $response = $client->request('GET', $APODUrl.$key);

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
    }

    /**
     * @Route("api/saveApod", name="saveApod")
     */
    public function saveApod(Request $request, ManagerRegistry $doctrine, EntityManagerInterface $entityManager){

        $apod = new ApodArchive();
        $apodRepo = $doctrine->getRepository(ApodArchive::class);

        $response = new Response(
            'Apod Saved',
            Response::HTTP_CREATED,
            ['content-type' => 'text/html']
        );


        if ($request->getMethod() == 'POST') {
            $parameters = json_decode($request->getContent(), true);
            foreach ($parameters['data'] as $field => $value){
            //  echo $field . ' ' . $value;
              switch ($field){
                  case 'title':
                      $apod->setTitle($value);
                      break;
                  case 'explanation':
                      $apod->setExplanation($value);
                      break;
                  case 'url':
                      $apod->setUrl($value);
                      break;
                  case 'date':
                      $apod->setDate(new DateTime($value));
                      $apod->setDateSaved(new DateTime($value));
                      $apodArchiveData = $apodRepo->findOneBy(['date' => new DateTime($value)]);
                      break;
              }
            }
            if($apodArchiveData != NULL){
                $response = new Response(
                    'Content Already exists',
                    Response::HTTP_ACCEPTED,
                    ['content-type' => 'text/html']
                );
                return ($response);
            }else{
                $entityManager->persist($apod);
                $entityManager->flush();
            }
            return ($response);
        }else{
            $response = new Response(
                $request->getMethod(),
                Response::HTTP_BAD_GATEWAY,
                ['content-type' => 'text/html']
            );
            return ($response);
        }

    }

    /**
     * @Route("api/saveMWD", name="saveMarsWeather")
     */
    public function saveMarsWeather(Request $request, ManagerRegistry $doctrine, EntityManagerInterface $entityManager){
        $MWDrepo = $doctrine->getRepository(MarsWeather::class);
        $response = new Response(
            '',
            Response::HTTP_CREATED,
            ['content-type' => 'text/html']
        );


        if ($request->getMethod() == 'POST') {
            $parameters = json_decode($request->getContent(), true);
            foreach ($parameters['data'] as $field => $value){
                switch ($field){
                    case (preg_match('/^[0-9]*$/', $field) ? true : false):
                        $MarsWeatherData = $MWDrepo->findOneBy(['sol' => $field]);
                        if($MarsWeatherData != NULL){
                            break;
                        }else{
                            $MarsWeather = new MarsWeather();
                            $MarsWeather->setSol($field);
                            $MarsWeather->setAtmosphericPressure($value['PRE']);
                            $MarsWeather->setAtmosphericTemperature($value['AT']);
                            $MarsWeather->setHorizontalWindSpeed($value['HWS']);
                            $MarsWeather->setWindDirection($value['WD']);
                            $MarsWeather->setSeason($value['Season']);
                            $MarsWeather->setDate(new DateTime('now'));
                            $entityManager->persist($MarsWeather);
                            $entityManager->flush();
                        }

                        break;
                            }

                }

            $response = new Response(
                'Created',
                Response::HTTP_CREATED,
                ['content-type' => 'text/html']
            );

            }
            return ($response);
        }



    /**
     * @Route("api/epic/", name="epicApi")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getEPIC(){

        $key = $this->getParameter('nasa_api_key');;

        $epicUrl = 'https://api.nasa.gov/EPIC/api/natural?api_key=';

        $client = HttpClient::create();

        $response = $client->request('GET', $epicUrl.$key);

        $statusCode = $response->getStatusCode();

        $contentType = $response->getHeaders()['content-type'][0];

        $content = $response->getContent();

        $content = $response->toArray();

        return new JsonResponse($content);
    }

    /**
     * @Route("api/marsweather", name="marsWeather")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getmarsWeather(){

        $key = $this->getParameter('nasa_api_key');;

        $epicUrl = 'https://api.nasa.gov/insight_weather/?api_key='.$key.'&feedtype=json&ver=1.0';


        $a= new \stdClass();
        $a->data = array();
        $x = array();

        $client = HttpClient::create();

        $response = $client->request('GET', $epicUrl.$key);

        $statusCode = $response->getStatusCode();

        $contentType = $response->getHeaders()['content-type'][0];

        $content = $response->getContent();

        $content = $response->toArray();

      //  var_dump($content["sol_keys"][0]);
        array_push($x,$content);

        $a = (object)$x;
        return new JsonResponse($x);
    }

    function getImageryEpic(){
        $month = '08';
        $day = 21;
        $year = '2017';

        $metadata = "https://epic.gsfc.nasa.gov/api/natural/date/{$year}-{$month}-{$day}";
        $meta = file_get_contents($metadata);   // get the metadata for that date and collection
        $arr = json_decode($meta);  // decode the metadata

        /*
         * Site Name	Archive	Collection	Year	Month	Day	Image Type	File Name
    https://epic.gsfc.nasa.gov	archive	natural	2016	10	31	png	epic_1b_20161031xxxx.png
         */

        foreach($arr as $item) {
            $name = $item->image . '.png';
            $archive = "https://epic.gsfc.nasa.gov/archive/natural/{$year}/{$month}/{$day}/png/";

            $source = $archive . $name;
            $destination = '/path/to/downloads/' . $name;

            copy($source, $destination);    // download and copy the image
        }
    }


    /**
     * @Route("api/marsrover", name="MarsRover")
     */
    public function marsRover()
    {

        $key = $this->getParameter('nasa_api_key');

        return new JsonResponse($key);


    }

    /**
     * @Route("api/techtransfer", name="techtransfer")
     */
    public function techtransfer()
    {

        $key = $this->getParameter('nasa_api_key');

        return new JsonResponse($key);


    }

    /**
     * @Route("/image/api", name="image")
     */
    public function saveImage(){
        $imageUrl = 'https://epic.gsfc.nasa.gov/archive/natural/2020/04/04/png/epic_1b_20200404061002.png';



        $data = $this->file_get_contents_curl($imageUrl);

        $fp = 'images/logo-1.png';

        file_put_contents( $fp, $data);

        return new Response("File saved:");

    }


    private function file_get_contents_curl($url) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);

        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }
}
