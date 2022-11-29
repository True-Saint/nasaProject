# Nasa Project

Nasa project is a php/react web app for using the nasa API.

It is a work in progress. Everything needs refining. CSS will be very basic in the early stages of development

## Requrements
```
PHP 8.1
mysql 5.7 (might work with other databases but this is untested)
```

## Installation

Use the package manager [composer](https://getcomposer.org) to install php dependencies.
Use the package manager [yarn](https://yarnpkg.com) to install js dependencies 

Regiser for an API Key on [Nasa's website](https://api.nasa.gov)

Paste the Key in .env under NASA_API_KEY
```
composer install
yarn install
yarn build
```

## (kinda) Working  Modules
So far, there is very basic functionality that simply displays data from the Nasa api.

APOD: Astronomy Picture Of the Day

Epic: Earth Polychromatic Imaging Camera

New Media: Displays images and videos taken at Nasa

Sync APOD will save APOD data to the database

Sync Mars Weather will save weather data tp the database

Admin does not require a login. You can see APOD images that you have saved

## Non-Functional Modules
Media: To be removed

Mars Weather: InSight: Mars Weather Service. Will display the weather on Mars each day

## To-Do
A lot
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
