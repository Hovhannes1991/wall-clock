export type Timeout = ReturnType<typeof setTimeout>;

export type ClockType = "arabic" | "roman";

type TimeItemsPosition = {
  rotate: string;
};

export type TimeItemsPositions = TimeItemsPosition[];

interface LinePositionsClasses {
  class_name: string;
  style: { rotate: string };
}
export type LinesPositionsClasses = LinePositionsClasses[];

export interface Offset {
  hour: number;
  minute: number;
}

export interface ClockHandPositions {
  hour: string;
  minute: string;
  second: string;
}

export interface CountriesResponseItem {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        common: string;
        official: string;
      };
    };
  };
  timezones: string[];
  capital: string[];
  flag: string;
  flags: string[];
  region: string;
}

export interface Country {
  id: string;
  name: string;
  offset: Offset;
  nativeName: string;
  flag: string;
  region: string;
  subregion: string;
  timezones: string[];
  alpha2Code: string;
  alpha3Code: string;
}
