/* This example requires Tailwind CSS v2.0+ */
import Highlighter from 'react-highlight-words'
import SkillModal from './skillModal'
import { useState } from 'react'
import { useDrag, DragSource, DragPreviewImage } from 'react-dnd'

const Spell = ({ ability, setSkill, setSkillModalOpen, customBuild }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'spell',
    item: {
      ability,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const selectedSpell = customBuild.some(
    (item) => item?.ability?.name === ability?.name
  )

  return (
    <>
      <DragPreviewImage src={ability.imgUrl} connect={preview} />
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={() => {
          setSkill(ability)
          setSkillModalOpen(true)
        }}
        key={ability.name}
        className='col-span-1 select-none cursor-pointer rounded-md border border-zinc-600 my-2 flex justify-center flex-row-reverse py-8 px-8'
      >
        <div className='flex flex-row pl-2 h-full w-full'>
          <div className='flex flex-col w-full'>
            <p className='text-lg leading-6 font-medium text-indigo-500'>
              {ability.name}
            </p>
            <p className='text-sm leading-6 text-violet-500'>
              {ability.castTime.length ? ability.castTime : 'Aura'}
            </p>
          </div>
          <div className='flex flex-col w-full'>
            <p className='text-md leading-6 font-medium text-amber-500'>
              {ability.cost.length ? ability.cost : 'No Cost'}
            </p>
            <p className='text-sm leading-6 text-indigo-500'>
              {ability.cooldown.length ? ability.cooldown : 'Aura'}
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='text-sm  font-medium text-green-500'>
              {ability.range.length ? ability.range : 'No range'}
            </p>
          </div>
        </div>
        <div
          className={`flex h-full ${
            selectedSpell ? 'border-2 border-amber-300' : ''
          }`}
        >
          <img
            className='h-[58px] w-[58] bg-gray-900'
            src={ability.imgUrl}
            alt={`${ability.name}`}
          />
        </div>
      </div>
    </>
  )
}

export default function SpellList({ abilities, setCustomBuild, customBuild }) {
  const [skillModalOpen, setSkillModalOpen] = useState(false)
  const [skill, setSkill] = useState({})

  return (
    <div className='w-full max-w-7xl rounded-md mb-20 sm:px-4 min-h-[24rem] bg-gray-800 lg:px-8'>
      <div className='mt-6 grid grid-cols-1 gap-1 gap-x-3 md:grid-cols-2 lg:mt-8'>
        {abilities
          ? abilities.map((ability, index) => {
              return (
                <Spell
                  key={ability.name}
                  setCustomBuild={setCustomBuild}
                  setSkill={setSkill}
                  customBuild={customBuild}
                  setSkillModalOpen={setSkillModalOpen}
                  ability={ability}
                />
              )
            })
          : null}
      </div>
      <SkillModal
        skill={skill}
        open={skillModalOpen}
        setOpen={setSkillModalOpen}
      />
    </div>
  )
}
