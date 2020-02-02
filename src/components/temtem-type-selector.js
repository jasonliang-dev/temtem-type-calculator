import React from "react"
import PropTypes from "prop-types"
import * as R from "ramda"

import TemtemTypeButton from "./temtem-type-button"
import GlobalStateContext from "../context/GlobalStateContext"
import {
  attackDirection as attackDirectionEnum,
  buttonVariant,
} from "../constants"

const TemtemTypeSelector = ({
  selectedTypes,
  setSelectedTypes,
  attackDirection,
}) => {
  const { typeDictionary } = React.useContext(GlobalStateContext)

  const headerClasses = "font-bold text-xl text-center mb-2"
  const buttonListClasses = "flex flex-wrap justify-center -mx-2"

  return (
    <div className="flex flex-col">
      <h2 className={headerClasses}>
        {attackDirection === attackDirectionEnum.DEFENCE
          ? "Primary Type"
          : "Technique Type"}
      </h2>
      <ul className={buttonListClasses}>
        {Object.values(typeDictionary).map(type => (
          <li key={type.name}>
            <TemtemTypeButton
              name={type.name}
              image={type.image}
              onClick={() =>
                setSelectedTypes(prev => ({
                  ...prev,
                  first: type.name,
                  second: prev.second === type.name ? undefined : prev.second,
                }))
              }
              variant={
                type.name === selectedTypes.first
                  ? buttonVariant.SELECTED
                  : null
              }
            />
          </li>
        ))}
      </ul>
      {attackDirection === attackDirectionEnum.DEFENCE && (
        <>
          <h2 className={`${headerClasses} mt-2`}>Secondary Type</h2>
          <ul className={buttonListClasses}>
            {Object.values(typeDictionary).map(type => (
              <li key={type.name}>
                <TemtemTypeButton
                  name={type.name}
                  image={type.image}
                  onClick={
                    type.name === selectedTypes.first
                      ? () => {}
                      : () =>
                          setSelectedTypes(prev => ({
                            ...prev,
                            second: type.name,
                          }))
                  }
                  variant={R.cond([
                    [
                      R.equals(selectedTypes.first),
                      () => buttonVariant.DISABLED,
                    ],
                    [
                      R.equals(selectedTypes.second),
                      () => buttonVariant.SELECTED,
                    ],
                    [R.T, () => null],
                  ])(type.name)}
                />
              </li>
            ))}
            <li className="inline">
              <TemtemTypeButton
                name="None"
                onClick={() =>
                  setSelectedTypes(prev => ({ ...prev, second: undefined }))
                }
                variant={selectedTypes.second ? null : buttonVariant.SELECTED}
              />
            </li>
          </ul>
        </>
      )}
    </div>
  )
}

TemtemTypeSelector.propTypes = {
  selectedTypes: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
  }).isRequired,
  setSelectedTypes: PropTypes.func.isRequired,
  attackDirection: PropTypes.string.isRequired,
}

export default TemtemTypeSelector
