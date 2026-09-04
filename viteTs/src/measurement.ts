export interface Measurement {
  id: number
  name: string
  gender: string
  height: number
  measurement_date: string
}

export interface NewMeasurement {
  name: string
  gender: string
  height: number
  measurement_date: string
}