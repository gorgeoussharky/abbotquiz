export interface DBEntry {
    id: number
    title: string
    group: string
    groupId: number
    type: string
    typeId: number
    doctors: string
    ph: boolean
    manometry: boolean
    radiography: boolean
    showOnFront: boolean
}

export interface RecommendationCard {
  title: string
  link?: string
  linkLabel?: string
  icon?: string
}

export interface Option {
    label: string
    value: string | number
  }

  export interface QuestionEntry {
    title: string
    options: Option[]
    value?: Option
  }