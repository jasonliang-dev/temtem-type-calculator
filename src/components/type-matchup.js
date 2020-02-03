import React from "react"
import * as R from "ramda"

import { attackDirection as attackDirectionEnum } from "../constants"
import GlobalStateContext from "../context/GlobalStateContext"

const TypeMatchup = ({ selectedTypes, attackDirection }) => {
  const { typeDictionary } = React.useContext(GlobalStateContext)

  const offensiveTypeMatchups = React.useMemo(() => {
    const calculateMultiplier = (arr, factor) =>
      arr.find(R.equals(selectedTypes.first)) ? factor : 1

    return Object.values(typeDictionary).map(type => {
      return {
        name: type.name,
        image: type.image,
        effectiveness:
          calculateMultiplier(type.effective, 2) *
          calculateMultiplier(type.ineffective, 0.5),
      }
    }, [])
  }, [typeDictionary, selectedTypes.first])

  const defensiveTypeMatchups = React.useMemo(() => {
    const combined = R.mergeWith(
      R.concat,
      typeDictionary[selectedTypes.first] || {},
      typeDictionary[selectedTypes.second] || {}
    )

    return Object.values(typeDictionary).map(type => {
      const calculateMultiplier = (arr, factor) =>
        arr.reduce(
          (product, typeName) =>
            typeName === type.name ? product * factor : product,
          1
        )

      return {
        name: type.name,
        image: type.image,
        effectiveness:
          calculateMultiplier(combined.effective || [], 2) *
          calculateMultiplier(combined.ineffective || [], 0.5),
      }
    }, [])
  }, [typeDictionary, selectedTypes.first, selectedTypes.second])

  return [4, 2, 1, 0.5, 0.25].map(multiplier => {
    const filtered = (attackDirection === attackDirectionEnum.OFFENCE
      ? offensiveTypeMatchups
      : defensiveTypeMatchups
    ).filter(R.propEq("effectiveness", multiplier))

    if (filtered.length === 0) {
      return null
    }

    return (
      <div key={multiplier} className="flex flex-col items-center my-4">
        <h2 className="font-bold mb-2">
          {attackDirection === attackDirectionEnum.OFFENCE
            ? `Deals ${multiplier}x damage to`
            : `Receives ${multiplier}x damage from`}
        </h2>
        <div className="flex flex-wrap justify-center">
          {filtered.map(({ name, image }) => (
            <div key={name} className="flex items-center mx-3 mb-2">
              <img className="w-8 h-8" alt="" src={`/images/types/${image}`} />
              <div className="ml-1">{name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  })
}

export default TypeMatchup
