import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

const anotherUser="chai aur react"

const reactElement= React.createElement(
  'a',
  { href:'https://googgle.com',target:'_blank' },
  'click me to visit google',
  anotherUser
);

createRoot(document.getElementById('root')).render(
 reactElement
);

