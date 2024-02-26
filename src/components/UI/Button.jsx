import React from 'react'

export default function Button({children,textOnly,className,...props}) {
    const cssClass=textOnly?`text-button ${className}`:`button ${className}`
  return (
    <button className={cssClass} {...props}>{children}</button>
  )
}
