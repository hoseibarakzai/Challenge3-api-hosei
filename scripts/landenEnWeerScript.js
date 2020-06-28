
  /* Deze functie vraagt de data over het ingevoerde land op uit de landen API */
  function landenData() {

    /* Dit is de landen API */
    var url = 'https://restcountries.eu/rest/v2/name';
    var country = document.getElementById('country').value;
    var request = url + '/' + country;

    fetch(request)

    /* Opgevraagde code omvormen naar JSON */
  	.then(function(response) {
      /* Antarctica eruit gooien omdat het geen land is. Waarom deze lange conditie? Omdat ik heb ingesteld dat de landen API werkt als je een onvolledig land invuld. Dit is best chill, dan hoef je niet het hele land in te tikken. De API werkt dus ook als je alle delen van het woord antarctica invuld, dit voorkom ik met de lange conditie hieronder */
      if (country == 'antarctica' || country == 'antarctic' || country == 'antarcti' || country == 'antarct' || country == 'antarc' || country == 'antar' || country == 'anta' || country == 'ant'){
        throw Error(response.statusText)
      }
      else{
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      }
  	})

      /* Onderstaande regels JavaScript halen de gegevens over het weer op uit de weer API */
      .then(function(response){
        /* Werkt de landen API? dan wordt onderstaande functie uitgevoerd. */
        landenDataSucces(response);

        /* Onderstaande regel code haalt de hoofdstad op van het ingevoerde land uit de landen API */
        var city = response[0].capital;
        console.log(response[0]);

        /* Dit is de weer API */
        var url = 'https://api.openweathermap.org/data/2.5/weather';
        var apiKey ='d92d793b02f70bf9383e4011ef22f042';

        var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;

        fetch(request)

        /* Opgevraagde code omvormen naar JSON */
        .then(function(weerReactie) {
          if(!weerReactie.ok) throw Error(weerReactie.statusText);
          return weerReactie.json();
        })

        /* Onderstaande functie haalt het weer op van de hoofdstad van het ingevoerde land */
        .then(function(weerReactie) {
          console.log(weerReactie);

          /* Onderstaande regels code halen de temperatuur van de hoofdstad op. */
          var temperatuurOphalen = weerReactie.main.temp;
          var temperatuurOmrekenen = Math.floor(temperatuurOphalen - 273.15);
          temperatuur.innerHTML = temperatuurOmrekenen + '&degC';

          /* Onderstaande regels code halen de beschrijving van het weer op. */
          var weerBeschrijving = weerReactie.weather[0].description;
          typeWeer.innerHTML = weerBeschrijving;

          /* Onderstaande regels code halen de windsnelheid op en rekenen deze om naar km/h. */
          var windsnelheidOphalen = weerReactie.wind.speed;
          var beaufortOmrekenen = (windsnelheidOphalen /= 0.84) * 3.6;
          windsnelheid.innerHTML = "Wind:" + " " + Math.floor(beaufortOmrekenen) + " " + "km/h";

          /* Onderstaande regels code halen het plaatje op passend bij het weer in de hoofdstad. */
          var iconUrl = 'http://openweathermap.org/img/wn/'+weerReactie.weather[0].icon+'@2x.png';
          weerPlaatje.innerHTML = '<div class="icon"> <img src="'+iconUrl+'"> </div>';
        })
      })

      /* Werkt een van de twee API's niet naar behoren? Onderstaande regels code zorgen ervoor dat een foutmelding van een van de twee API's opgevangen kan worden. */
      .catch(function (error) {
        landenDataError(error);
        weerError(error);
      });
    }



    /* Onderstaande functie vraagt onderstaande gegevens op uit de landen API */
    function landenDataSucces(response) {
      /* Onderstaande vier regels code verwijderen de class die wordt toegevoegd aan twee ID's als er een foutmelding is. */
      var informatieLinksBoven = document.getElementById('articleLinksBoven');
      informatieLinksBoven.classList.remove("hidden");

      var informatieRechtsOnder = document.getElementById('articleRechtsOnder');
      informatieRechtsOnder.classList.remove("hidden");

      /* Onderstaande regels code halen de naam en inheemse naam van het land op. */
      var landNaam = response[0].name;
      naamVanLand.innerHTML = 'Country:' + ' ' + landNaam;

      var inheemseLandNaam = response[0].nativeName;
      inheemseNaamVanLand.innerHTML = 'Native name:' + ' ' + inheemseLandNaam;

      /* Onderstaande regels code halen de regio en subregio van het land op. */
      var landRegio = response[0].region;
      regio.innerHTML = 'Region:' + ' ' + landRegio;

      var subRegio = response[0].subregion;
      subregio.innerHTML = 'Subregion:' + ' ' + subRegio;

      /* Onderstaande regels code haalt de hoofdstad van het land op. */
      var hoofdstadVanLand = response[0].capital;
      hoofdstad.innerHTML = 'Capital:' + ' ' + hoofdstadVanLand;

      /* Onderstaande regels code halen de betaalmiddel en symbool daarvan van het land op. */
      var betaalmiddel = response[0].currencies[0].name;
      betaalmiddelVanLand.innerHTML = 'Currency:' + ' ' + betaalmiddel;

      var betaalmiddelVanLandSymbool = response[0].currencies[0].symbol;
      betaalmiddelSymbool.innerHTML = 'Currency symbol:' + ' ' + betaalmiddelVanLandSymbool;

      /* Onderstaande regels code haalt de populatie van het land op. */
      var populatieVanLand = response[0].population;
      var populatieVanLandSpaties = populatieVanLand.toLocaleString();
      populatie.innerHTML = 'Population:' + ' ' + populatieVanLandSpaties;

      /* Onderstaande regels code haalt de oppervlakte van het land op. */
      var oppervlakteVanLand = response[0].area;
      var oppervlakteVanLandSpaties = oppervlakteVanLand.toLocaleString();
      oppervlakte.innerHTML = 'Area in km&#178;' + ':' + ' ' + oppervlakteVanLandSpaties;

      /* Onderstaande regels code haalt het landnummer van het land op. */
      var landNummerVanLand = response[0].callingCodes[0];
      landnummer.innerHTML = 'Calling Code' + ':' + ' ' + landNummerVanLand;

      /* Onderstaande regels code haalt de vlag van het land op. */
      var vlag = response[0].flag;
      vlagVanLand.innerHTML = '<div class="vlagStyling"> <img src="'+vlag+'"> </div>';
    }



    /* Onderstaande functie wordt uitgevoerd als de landen API niet naar behoren werkt. */
    function landenDataError(error) {
      /* Onderstaande regels code zet in de box van de vlag van het land een foutmelding. */
      var vlagFoutmelding = document.getElementById('vlagVanLand');
      vlagFoutmelding.innerHTML = 'Please try again. Did you make a spelling mistake?';

      /* Onderstaande regels code voegen een class toe aan twee ID's. Hierdoor verdwijnen de opgevraagde gegevens over het land in de box 'Country information' bij een foutmelding. */
      var informatieLinksBoven = document.getElementById('articleLinksBoven');
      informatieLinksBoven.classList.add("hidden");

      var informatieRechtsOnder = document.getElementById('articleRechtsOnder');
      informatieRechtsOnder.classList.add("hidden");
    }

    /* Onderstaande functie wordt uitgevoerd als de weer API niet naar behoren werkt. */
    function weerError(error) {
      /* Onderstaande regels code verwijderen het plaatje van het weer. */
      var weerAfbeelding = document.getElementById('weerPlaatje');
      weerAfbeelding.innerHTML = '';

      /* Onderstaande regels code zet dit woord neer bij de tekst waar normaal de temperatuur in de hoofdstad staat. */
      var temperatuur = document.getElementById('temperatuur');
      temperatuur.innerHTML = 'Loading...';

      /* Onderstaande regels code zet deze woorden neer bij de tekst waar normaal een beschrijving van het weer in de hoofdstad staat. */
      var typeWeer = document.getElementById('typeWeer');
      typeWeer.innerHTML = 'Please wait.';

      /* Onderstaande regels code verwijderd de windsnelheid. */
      var windsnelheid = document.getElementById('windsnelheid');
      windsnelheid.innerHTML = '';


    }



    /* Onderstaande regels code zorgen ervoor dat de functie landenData(); (de functie die de data uit de twee API's opvraagd) pas wordt uitgevoerd als op de zoekknop wordt geklikt. */
    document.getElementsByClassName('zoekLand').onclick = function(){
      landenData();
    };
