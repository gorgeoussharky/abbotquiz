export interface DBEntry {
  title: string;
  group: string;
  type: string;
  doctors?: string;
  showOnFront?: boolean;
}

export interface LPPTypeEntry {
  title_base: string
  value_base?: number,
  title_max: string,
  value_max?: number,
  unit: string,
  id: string
}

export interface LPPMedicamentEntry {
  name: string
  toxicity: string
  mechanism: string
  risk: string
  outcomes: string
  links: string
}

export interface QuestionEntry {
  title: string;
  subtitle?: string
  type: string
  options?: Option[];
  value?: Option;
  warning?: {
    text: string;
    condition: string | number;
  };
  group: string
  groups?: {
    title: string;
    id: string
    options: {
      label: string;
      id: string
      value: boolean[]
    }[]
  }[]
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
  score?: number
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
  icon?: string
  title: string;
  code?: string;
  subtitle?: string
  content?: () => JSX.Element
}

export interface DosageItem {
  title: string
  level?: string
  dosage: string
}