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

export interface Option {
    label: string
    value: string
  }

  export interface QuestionEntry {
    title: string
    options: string[]
    values: string[]
  }