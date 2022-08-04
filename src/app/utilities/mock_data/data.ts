import { AutocompleteResult } from "../models/autocomplete-result";
import { CurrentWeatherResult } from "../models/current-weather-result";
import { FutureResultObject } from "../models/future-weather-result";
import { GeolocationWeatherResult } from "../models/geolocation-weather-result";


export const LOCATIONS_AUTOCOMPLETE_RESULT: AutocompleteResult[] = [
  {
    Version: 1,
    Key: "226396",
    Type: "City",
    Rank: 10,
    LocalizedName: "Tokyo",
    Country: {
      ID: "JP",
      LocalizedName: "Japan"
    },
    AdministrativeArea: {
      ID: "13",
      LocalizedName: "Tokyo"
    }
  },
  {
    Version: 1,
    Key: "212575",
    Type: "City",
    Rank: 10,
    LocalizedName: "Rosh HaAyin",
    Country: {
      ID: "JP",
      LocalizedName: "Isreal"
    },
    AdministrativeArea: {
      ID: "13",
      LocalizedName: "Rosh HaAyin"
    }
  },
  {
    Version: 1,
    Key: "106770",
    Type: "City",
    Rank: 11,
    LocalizedName: "Taiyuan",
    Country: {
      ID: "CN",
      LocalizedName: "China"
    },
    AdministrativeArea: {
      ID: "SX",
      LocalizedName: "Shanxi"
    }
  },
  {
    Version: 1,
    Key: "106780",
    Type: "City",
    Rank: 11,
    LocalizedName: "Tianjin",
    Country: {
      ID: "CN",
      LocalizedName: "China"
    },
    AdministrativeArea: {
      ID: "TJ",
      LocalizedName: "Tianjin"
    }
  },
  {
    Version: 1,
    Key: "58491",
    Type: "City",
    Rank: 13,
    LocalizedName: "Tongren",
    Country: {
      ID: "CN",
      LocalizedName: "China"
    },
    AdministrativeArea: {
      ID: "GZ",
      LocalizedName: "Guizhou"
    }
  },
  {
    Version: 1,
    Key: "102324",
    Type: "City",
    Rank: 13,
    LocalizedName: "Tangshan",
    Country: {
      ID: "CN",
      LocalizedName: "China"
    },
    AdministrativeArea: {
      ID: "HE",
      LocalizedName: "Hebei"
    }
  },
  {
    Version: 1,
    Key: "59573",
    Type: "City",
    Rank: 13,
    LocalizedName: "Taizhou",
    Country: {
      ID: "CN",
      LocalizedName: "China"
    },
    AdministrativeArea: {
      ID: "JS",
      LocalizedName: "Jiangsu"
    }
  },
  {
    Version: 1,
    Key: "60198",
    Type: "City",
    Rank: 13,
    LocalizedName: "Tongliao",
    Country: {
      ID: "CN",
      LocalizedName: "China"
    },
    AdministrativeArea: {
      ID: "NM",
      LocalizedName: "Inner Mongolia"
    }
  },
  {
    Version: 1,
    Key: "106571",
    Type: "City",
    Rank: 13,
    LocalizedName: "Tai'an",
    Country: {
      ID: "CN",
      LocalizedName: "China"
    },
    AdministrativeArea: {
      ID: "SD",
      LocalizedName: "Shandong"
    }
  },
  {
    Version: 1,
    Key: "58055",
    Type: "City",
    Rank: 15,
    LocalizedName: "Tianshui",
    Country: {
      ID: "CN",
      LocalizedName: "China"
    },
    AdministrativeArea: {
      ID: "GS",
      LocalizedName: "Gansu"
    }
  },
  {
    Version: 1,
    Key: "2333653",
    Type: "City",
    Rank: 15,
    LocalizedName: "Taizhou",
    Country: {
      ID: "CN",
      LocalizedName: "China"
    },
    AdministrativeArea: {
      ID: "ZJ",
      LocalizedName: "Zhejiang"
    }
  },
  {
    Version: 1,
    Key: "215854",
    Type: "City",
    Rank: 31,
    LocalizedName: "Tel Aviv",
    Country: {
      ID: "IL",
      LocalizedName: "Israel"
    },
    AdministrativeArea: {
      ID: "TA",
      LocalizedName: "Tel Aviv"
    }
  }
]

export const CURRENT_WEATHER_RESULT: CurrentWeatherResult[] = [
  {
    LocalObservationDateTime: new Date('2022-07-28T15:28:00+03:00'),
    EpochTime: 1659011280,
    WeatherText: 'Sunny',
    WeatherIcon: 1,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: true,
    Temperature: {
      Metric: {
        Value: 34.6,
        Unit: 'C',
        UnitType: 17
      },
      Imperial: {
        Value: 94.0,
        Unit: 'F',
        UnitType: 18
      }
    },
    MobileLink: 'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
    Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us'
  }
]
export const FUTURE_WEATHER_RESULT: FutureResultObject = {
  Headline: {
    EffectiveDate: new Date('2022-07-28T14:00:00+03:00'),
    EffectiveEpochDate: 1659006000,
    Severity: 4,
    Text: "Danger of dehydration and heat stroke if outside for extended periods of time Thursday afternoon",
    Category: "heat",
    EndDate: new Date('2022-07-28T20:00:00+03:00'),
    EndEpochDate: 1659027600,
    MobileLink: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
    Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
  },
  DailyForecasts: [
    {
      Date: new Date('2022-07-28T07:00:00+03:00'),
      EpochDate: 1658980800,
      Temperature: {
        Minimum: {
          Value: 24.0,
          Unit: "C",
          UnitType: 18
        },
        Maximum: {
          Value: 94.0,
          Unit: "C",
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 34,
        IconPhrase: "Mostly clear",
        HasPrecipitation: false
      },
      Sources: [
        "AccuWeather"
      ],
      MobileLink: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
    },
    {
      Date: new Date('2022-07-29T07:00:00+03:00'),
      EpochDate: 1659067200,
      Temperature: {
        Minimum: {
          Value: 76.0,
          Unit: "C",
          UnitType: 18
        },
        Maximum: {
          Value: 92.0,
          Unit: "C",
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 35,
        IconPhrase: "Partly cloudy",
        HasPrecipitation: false
      },
      Sources: [
        "AccuWeather"
      ],
      MobileLink: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
    },
    {
      Date: new Date('2022-07-30T07:00:00+03:00'),
      EpochDate: 1659153600,
      Temperature: {
        Minimum: {
          Value: 74.0,
          Unit: "C",
          UnitType: 18
        },
        Maximum: {
          Value: 90.0,
          Unit: "C",
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 34,
        IconPhrase: "Mostly clear",
        HasPrecipitation: false
      },
      Sources: [
        "AccuWeather"
      ],
      MobileLink: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
    },
    {
      Date: new Date('2022-07-31T07:00:00+03:00'),
      EpochDate: 1659240000,
      Temperature: {
        Minimum: {
          Value: 74.0,
          Unit: "C",
          UnitType: 18
        },
        Maximum: {
          Value: 88.0,
          Unit: "C",
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 34,
        IconPhrase: "Mostly clear",
        HasPrecipitation: false
      },
      Sources: [
        "AccuWeather"
      ],
      MobileLink: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
    },
    {
      Date: new Date('2022-08-01T07:00:00+03:00'),
      EpochDate: 1659326400,
      Temperature: {
        Minimum: {
          Value: 74.0,
          Unit: "C",
          UnitType: 18
        },
        Maximum: {
          Value: 89.0,
          Unit: "C",
          UnitType: 18
        }
      },
      Day: {
        Icon: 2,
        IconPhrase: "Mostly sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 34,
        IconPhrase: "Mostly clear",
        HasPrecipitation: false
      },
      Sources: [
        "AccuWeather"
      ],
      MobileLink: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
    }
  ]
}

export const GEOLOCATION_DATA: GeolocationWeatherResult =
{
  Version: 1,
  Key: '212575',
  Type: 'City',
  Rank: 55,
  LocalizedName: 'Rosh HaAyin',
  EnglishName: 'Rosh HaAyin',
  Country: {
    ID: 'IL',
    LocalizedName: 'Israel',
    EnglishName: 'Israel'
  },
  GeoPosition: {
    Latitude: 32.094,
    Longitude: 34.946,
    Elevation: {
      Metric: {
        Value: 29.0,
        Unit: 'm',
        UnitType: 5
      },
      Imperial: {
        Value: 95.0,
        Unit: 'ft',
        UnitType: 0
      }
    }
  },
}
