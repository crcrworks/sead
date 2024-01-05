import React from 'react'

export type State<T> = {
  state: T
  setState: React.Dispatch<React.SetStateAction<T>>
}
