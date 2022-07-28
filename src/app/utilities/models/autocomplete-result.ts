
    export interface Country {
      ID: string;
      LocalizedName: string;
  }

  export interface AdministrativeArea {
      ID: string;
      LocalizedName: string;
  }

  export interface AutocompleteResult {
      Version: number;
      Key: string;
      Type: string;
      Rank: number;
      LocalizedName: string;
      Country: Country;
      AdministrativeArea: AdministrativeArea;
  }
