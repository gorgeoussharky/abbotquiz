export interface DBEntry {
  title: string;
  group: string;
  type: string;
  doctors?: string;
  showOnFront?: boolean;
}

export interface QuestionEntry {
  title: string;
  type: string
  options?: Option[];
  value?: Option;
  warning?: {
    text: string;
    condition: string | number;
  };
  optional?: boolean;
  id?: string
  condition?: {
    question: string
    value: string | number;
  }
}


export interface Examination {
  title: string;
  link?: string;
  linkLabel?: string;
  icon?: string;
  questions?: QuestionEntry[];
}

export interface RecommendationCardType {
  title: string;
  text?: string
  list?: string[]
  link?: string;
  linkLabel?: string;
  icon?: string;
  children?: JSX.Element | JSX.Element[]
  linkHasArrow?: boolean;
  expandable?: boolean;
  unlist?: boolean;
}

export interface Option {
  label: string;
  value: string | number | boolean;
}

export interface InteractionDBEntry {
  id?: number
  name: string
  recommendations?: string
  description?: string
  risk?: string
  level?: string
  tactik?: string
  mainMed?: string
}

export interface InteractionDB {
  [key: string]: InteractionDBEntry[]
}