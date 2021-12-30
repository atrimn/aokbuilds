import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { getClassesAsync } from '../utils/getClasses'
import Hero from '../components/hero'
import ClassSelection from '../components/classSelection'
import SpellList from '../components/spellList'
import SpellDropContainer from '../components/spellDropContainer'

export default function Home() {
  const [classes, setClasses] = React.useState([])
  const [abilities, setAbilities] = React.useState([])
  const [customBuild, setCustomBuild] = React.useState([])

  const scrollIntoView = (e) => {
    e.preventDefault()
    const element = document.getElementById('spells')
    element.scrollIntoView({ behavior: 'smooth' })
    console.log(element)
  }

  const removeAbility = (index) => {
    console.log(index)
    const filteredArray = customBuild.filter((item, i) => i !== index)
    setCustomBuild([...filteredArray])
  }

  const setCustomBuildHandler = (ability, index) => {
    console.log(ability)
    // loop through array see if ability is already in array
    const checkDuplicates = customBuild?.some((item) => {
      return item.ability.name === ability?.ability?.name
    })
    if (!checkDuplicates) {
      if (customBuild[index] !== undefined) {
        console.log(index)
        const replaceSpell = customBuild.filter((item, i) => i !== index)
        replaceSpell.splice(index, 0, ability)
        setCustomBuild([...replaceSpell])
        return
      }
      setCustomBuild([...customBuild, ability])
    }
  }

  useEffect(async () => {
    const classes = await getClassesAsync()
    setClasses(classes)
    // console.log(classes)
  }, [])
  useEffect(async () => {
    console.log(customBuild)
  }, [customBuild])

  return (
    <div id='classes' className='relative bg-gray-900'>
      <Hero scrollIntoView={scrollIntoView} />
      <ClassSelection
        classes={classes}
        setAbilities={setAbilities}
        setCustomBuild={setCustomBuild}
      />
      <div
        id='spells'
        className='relative px-4 flex flex-col justify-center items-center w-full'
      >
        <DndProvider backend={HTML5Backend}>
          <SpellList
            customBuild={customBuild}
            abilities={abilities}
            setCustomBuild={setCustomBuild}
          />
          <SpellDropContainer
            removeAbility={removeAbility}
            customBuild={customBuild}
            setCustomBuild={setCustomBuildHandler}
          />
        </DndProvider>
      </div>
    </div>
  )
}
