import { observable } from 'mobx'

const DataStore = {
  name: '',
  names: [],
  messages: []
}

export default observable(DataStore)
