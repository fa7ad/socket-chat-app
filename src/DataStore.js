import { observable } from 'mobx'

const DataStore = {
  name: '',
  messages: []
}

export default observable(DataStore)
