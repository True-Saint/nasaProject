<?php

namespace App\Entity;

use App\Repository\MarsWeatherRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints\Json;

/**
 * @ORM\Entity(repositoryClass=MarsWeatherRepository::class)
 */
class MarsWeather
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $sol;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Season;

    /**
     * @ORM\Column(type="object")
     */
    private $atmosphericTemperature = [];

    /**
     * @ORM\Column(type="object")
     */
    private $horizontalWindSpeed = [];

    /**
     * @ORM\Column(type="object")
     */
    private $atmosphericPressure = [];

    /**
     * @ORM\Column(type="object")
     */
    private $windDirection = [];
    public function __construct()
    {

    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSol(): ?string
    {
        return $this->sol;
    }

    public function setSol(string $sol): self
    {
        $this->sol = $sol;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getSeason(): ?string
    {
        return $this->Season;
    }

    public function setSeason(string $Season): self
    {
        $this->Season = $Season;

        return $this;
    }

    public function getAtmosphericTemperature()
    {
        return $this->atmosphericTemperature;
    }

    public function setAtmosphericTemperature( $atmosphericTemperature): self
    {
        $this->atmosphericTemperature = $atmosphericTemperature;

        return $this;
    }

    public function getHorizontalWindSpeed()
    {
        return $this->horizontalWindSpeed;
    }

    public function setHorizontalWindSpeed( $horizontalWindSpeed): self
    {
        $this->horizontalWindSpeed = $horizontalWindSpeed;

        return $this;
    }

    public function getAtmosphericPressure()
    {
        return $this->atmosphericPressure;
    }

    public function setAtmosphericPressure( $atmosphericPressure): self
    {
        $this->atmosphericPressure = $atmosphericPressure;

        return $this;
    }

    public function getWindDirection()
    {
        return $this->windDirection;
    }

    public function setWindDirection( $windDirection): self
    {
        $this->windDirection = $windDirection;

        return $this;
    }

    public function __toString(): string
    {
        return json_encode($this->sol);
    }
}
