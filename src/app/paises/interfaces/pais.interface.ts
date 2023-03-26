export interface PaisSmall {
  name: Name;
  cca3: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  official: string;
  common: string;
}

export interface Fronteras {
  borders: string[];
}
