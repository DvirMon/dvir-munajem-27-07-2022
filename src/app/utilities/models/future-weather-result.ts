
    export interface Headline {
      EffectiveDate: Date;
      EffectiveEpochDate: number;
      Severity: number;
      Text: string;
      Category: string;
      EndDate: Date;
      EndEpochDate: number;
      MobileLink: string;
      Link: string;
  }

  export interface Minimum {
      Value: number;
      Unit: string;
      UnitType: number;
  }

  export interface Maximum {
      Value: number;
      Unit: string;
      UnitType: number;
  }

  export interface DailyTemperature {
      Minimum: Minimum;
      Maximum: Maximum;
  }

  export interface Day {
      Icon: number;
      IconPhrase: string;
      HasPrecipitation: boolean;
  }

  export interface Night {
      Icon: number;
      IconPhrase: string;
      HasPrecipitation: boolean;
  }

  export interface DailyForecast {
      Date: Date;
      EpochDate: number;
      Temperature: DailyTemperature;
      Day: Day;
      Night: Night;
      Sources: string[];
      MobileLink: string;
      Link: string;
  }

  export interface FutureResultObject {
      Headline: Headline;
      DailyForecasts: DailyForecast[];
  }
