import React from "react"
import * as R from "ramda"

const TypeMatchup = ({ dataEdges, selectedTypes, damageDirection }) => {
  const offensiveTypeMatchups = React.useMemo(() => {
    const calculateMultiplier = (arr, factor) =>
      arr.find(R.equals(selectedTypes.first)) ? factor : 1

    return dataEdges.map(
      edge => ({
        name: edge.node.name,
        image: edge.node.image,
        effectiveness:
          calculateMultiplier(edge.node.effective, 2) *
          calculateMultiplier(edge.node.ineffective, 0.5),
      }),
      []
    )
  }, [dataEdges, selectedTypes.first])

  const defensiveTypeMatchups = React.useMemo(() => {
    const first = dataEdges.find(
      ({ node }) => node.name === selectedTypes.first
    )
    const second = dataEdges.find(
      ({ node }) => node.name === selectedTypes.second
    )
    const combinedTypeData = R.mergeWith(
      R.concat,
      first ? first.node : {},
      second ? second.node : {}
    )

    return dataEdges.map(edge => {
      const calculateMultiplier = (arr, factor) =>
        arr.reduce(
          (product, typeName) =>
            typeName === edge.node.name ? product * factor : product,
          1
        )

      return {
        name: edge.node.name,
        image: edge.node.image,
        effectiveness:
          calculateMultiplier(combinedTypeData.effective, 2) *
          calculateMultiplier(combinedTypeData.ineffective, 0.5),
      }
    }, [])
  }, [dataEdges, selectedTypes.first, selectedTypes.second])

  // console.log("offensiveTypeMatchups", offensiveTypeMatchups)
  // console.log("defensiveTypeMatchups", defensiveTypeMatchups)

  return [4, 2, 1, 0.5, 0.25].map(multiplier => {
    const filtered = (damageDirection === "offence"
      ? offensiveTypeMatchups
      : defensiveTypeMatchups
    ).filter(R.propEq("effectiveness", multiplier))

    if (filtered.length === 0) {
      return null
    }

    return (
      <div key={multiplier} className="my-3">
        <h2 className="font-bold mb-1">
          {damageDirection === "offence"
            ? `Deals ${multiplier}x damage to`
            : `Takes ${multiplier}x damage from`}
        </h2>
        <div className="flex flex-wrap">
          {filtered.map(({ name, image }) => (
            <div key={name} className="flex items-center w-32 mb-2">
              {/* eslint-disable-next-line global-require, import/no-dynamic-require */}
              <img alt="" src={require(`../images/${image}`)} />
              <div className="ml-1">{name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  })
}

export default TypeMatchup
