import path from 'path'
import {remote} from 'electron'
import fs from 'fs'

let cachedKey = ''
export default {
  setKey: (key, successCallback) => {
    return new Promise(function (resolve, reject) {
      fs.writeFile(path.join(remote.app.getPath('userData'), '.secret'), key, err => {
        // throws an error, caught outside
        if (err) {
          reject(err)
        }

        // success case, the file was saved
        if (successCallback) {
          successCallback()
        }
        cachedKey = key
        resolve(key)
      })
    })
  },
  getKey: () => {
    return new Promise(function (resolve, reject) {
      if (cachedKey) {
        resolve(cachedKey)
        return
      }
      fs.readFile(path.join(remote.app.getPath('userData'), '.secret'), 'utf8', function (err, data) {
        if (err) {
          reject(err)
        }

        if (data !== 'undefined' && data) {
          resolve(data)
        } else {
          resolve('')
        }
      })
    })
  }
}
