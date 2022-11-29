<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200612234618 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE mars_weather CHANGE atmospheric_temperature atmospheric_temperature LONGTEXT NOT NULL COMMENT \'(DC2Type:object)\', CHANGE horizontal_wind_speed horizontal_wind_speed LONGTEXT NOT NULL COMMENT \'(DC2Type:object)\', CHANGE atmospheric_pressure atmospheric_pressure LONGTEXT NOT NULL COMMENT \'(DC2Type:object)\', CHANGE wind_direction wind_direction LONGTEXT NOT NULL COMMENT \'(DC2Type:object)\'');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE mars_weather CHANGE atmospheric_temperature atmospheric_temperature JSON NOT NULL, CHANGE horizontal_wind_speed horizontal_wind_speed JSON NOT NULL, CHANGE atmospheric_pressure atmospheric_pressure JSON NOT NULL, CHANGE wind_direction wind_direction JSON NOT NULL');
    }
}
