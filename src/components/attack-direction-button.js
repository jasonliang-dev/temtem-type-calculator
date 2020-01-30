import React from "react"

import styles from "./attack-direction-button.module.css"

const AttackDirectionButton = ({ onClick, children, mask }) => {
  return (
    <button
      className={`relative mx-2
        ${styles["attack-direction-button"]}
      `}
      type="button"
      onClick={onClick}
    >
      <div
        className={`relative z-10 flex items-center justify-center bg-tem-dark-gray hover:bg-tem-gray text-gray-100
          ${styles[mask]}
        `}
      >
        {children}
      </div>
      <div
        className={`absolute z-0 inset-0 mt-1 ml-1 bg-black opacity-25
          ${styles[mask]}
        `}
      />
    </button>
  )
}

export default AttackDirectionButton
