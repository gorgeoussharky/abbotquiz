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
  group: string
  pill?: boolean
  cols?: number
  optional?: boolean;
  id: string
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
  title?: string;
  label: string;
  value: string | number | boolean;
  cols?: number
  dependency?: {
    id: string
    value: string
  }
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

export interface InterpretationItemType {
  title: string;
  code?: string;
  subtitle?: string
  content: () => JSX.Element
}

export interface DosageItem {
  title: string
  level?: string
  dosage: string
}