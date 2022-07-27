import { AutocompleteResult } from "../models/autocomplete-result";
import { CurrentWeatherResult } from "../models/current-weather-result";

export const LOCATIONS_AUTOCOMPLETE: AutocompleteResult[] = [
  {
    Version: 1,
    Key: '25257',
    Type: 'City',
    Rank: 21,
    LocalizedName: 'Adelaide',
    EnglishName: 'Adelaide',
    PrimaryPostalCode: '',
    Region: {
      ID: 'OCN',
      LocalizedName: 'Oceania',
      EnglishName: 'Oceania'
    },
    Country: {
      ID: 'AU',
      LocalizedName: 'Australia',
      EnglishName: 'Australia'
    },
    AdministrativeArea: {
      ID: 'SA',
      LocalizedName: 'South Australia',
      EnglishName: 'South Australia',
      Level: 1,
      LocalizedType: 'State',
      EnglishType: 'State',
      CountryID: 'AU'
    },
    TimeZone: {
      Code: 'ACST',
      Name: 'Australia/Adelaide',
      GmtOffset: 9.5,
      IsDaylightSaving: false,
      NextOffsetChange: new Date(' 2022-10-01T16:30:00Z')
    },
    GeoPosition: {
      Latitude: -34.927,
      Longitude: 138.593,
      Elevation: {
        Metric: {
          Value: 56,
          Unit: 'm',
          UnitType: 5
        },
        Imperial: {
          Value: 183,
          Unit: 'ft',
          UnitType: 0
        }
      }
    },
    IsAlias: false,
    SupplementalAdminAreas: [],
    DataSets: [
      'AirQualityCurrentConditions',
      'AirQualityForecasts',
      'Alerts',
      'FutureRadar',
      'MinuteCast',
      'Radar'
    ]
  }

]


export const CURRENT_WEATHER : CurrentWeatherResult[] = []
export const FUTURE_WEATHER : CurrentWeatherResult[] = []
