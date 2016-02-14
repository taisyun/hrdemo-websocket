import { createStore } from 'redux'
import todoApp from './reducer'
import initialData from './data.json'

export default function configureStore(initialState) {

  const state = Object.assign({}, initialState, {
    jobList: {
      items: initialData
/*
      items: [

        {
          jobId: 1,
          code: "JOB0001",
          name: "Able Seamen",
          version: 1,
          _links: {
            self: {
              href: "http://192.168.56.101:8091/hrdemo/jobs/1"
            }
          }
        },
        {
          jobId: 2,
          code: "JOB0002",
          name: "Account Manager",
          version: 1,
          _links: {
            self: {
              href: "http://192.168.56.101:8091/hrdemo/jobs/2"
            }
          }
        },
        {
          jobId: 3,
          code: "JOB0003",
          name: "Accountant",
          version: 1,
          _links: {
            self: {
              href: "http://192.168.56.101:8091/hrdemo/jobs/3"
            }
          }
        },

      ]
*/
    }
  })
  const store = createStore(todoApp, state)

  return store
}
