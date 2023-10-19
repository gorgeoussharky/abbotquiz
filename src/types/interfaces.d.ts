export interface DBEntry {
  id: number;
  title: string;
  group: string;
  groupId: number;
  type: string;
  typeId: number;
  doctors: string;
  ph: boolean;
  manometry: boolean;
  radiography: boolean;
  showOnFront: boolean;
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
}

export interface Option {
  label: string;
  value: string | number | boolean;
}

