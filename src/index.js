import React from 'react'
import ReactDOM from 'react-dom'

import './styles/index.css'
import App from './App'
import { setCanvasImg } from './Editor'
import reportWebVitals from './reportWebVitals'
import { sendToVercelAnalytics } from './Vitals'

export const image = new Image()

export let imageBase64

export function setImage(base64) {
  console.log("img has been set. ")

  image.src = base64

  image.onload = () => {
    //stop if image is too small
    if (image.width < 16 || image.height < 32) 
      return alert("The image you uploaded is too small!")

    //stop showing the start content
    document.getElementById('start').style.display = "none"

    document.getElementById('finish').style.display = "none"
    imageBase64 = image.src

    //show the editor or final based on image size
    if (image.width === 16 && image.height === 32) {
      document.getElementById('finish').style.display = "block"
      document.getElementById('finish-img').src = image.src
    } else {
      document.getElementById('editor').style.display = "grid"
      setCanvasImg()
    }
  }
}

//cookies:
//wrapimage|bool string
//aspectratio|bool string
//preciseedit|bool string

export function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${cname}=${cvalue};${expires};path=/`
}

export function getCookie(cname) {
  const name = `${cname}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')

  for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0)
        return c.substring(name.length, c.length)
  }

  return ""
}

console.log("pngskin by udu3324 (https://github.com/udu3324)")

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals(sendToVercelAnalytics)