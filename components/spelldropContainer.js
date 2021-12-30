/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/solid'
import { useDrop } from 'react-dnd'
import BuildModal from './BuildModal'

const tabs = [
  { name: 'My Account', href: '#', current: true },
  { name: 'Company', href: '#', current: false },
  { name: 'Team Members', href: '#', current: false },
  { name: 'Billing1', href: '#', current: false },
  { name: 'Billing2', href: '#', current: false },
  { name: 'Billing3', href: '#', current: false },
  { name: 'Billin4', href: '#', current: false },
  { name: 'Billing5', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SpellContainer = ({
  setCustomBuild,
  customBuild,
  removeAbility,
  index,
  tab,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'spell',
    drop: (item, monitor) => {
      // setCustomBuild([...customBuild, item])
      console.log(item)
      setCustomBuild(item, index)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <button
      key={tab.name}
      ref={drop}
      style={
        isOver ? { opacity: '0.5' } : { backgroundColor: ' rgb(39 39 42)' }
      }
      type='button'
      onClick={() => removeAbility(index)}
      className='relative bg-gray-800 block w-[53px] h-[53px] border-2 overflow-hidden mx-2 border-gray-300 border-dashed rounded-lg  text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    >
      {customBuild.length > 0 ||
      customBuild[index] !== 'undefined' ||
      customBuild[index] !== null ? (
        <img
          key={customBuild[index]?.ability.imgUrl}
          src={customBuild[index]?.ability.imgUrl}
          className='h-[53px] w-[53px]'
        />
      ) : (
        <PlusIcon
          color='white'
          className='-ml-1 mr-2 h-5 w-5 text-white'
          aria-hidden='true'
        />
      )}
    </button>
  )
}

export default function Example({
  customBuild,
  setCustomBuild,
  removeAbility,
}) {
  const [confirmBuildModal, setConfirmBuildModal] = useState(false)
  return (
    <div className='sticky  bottom-16'>
      <div className='hidden sm:block'>
        <nav className='relative z-0 rounded-lg shadow flex flex-row  divide-gray-200'>
          {tabs.map((tab, index) => (
            <SpellContainer
              key={tab.name}
              tab={tab}
              removeAbility={removeAbility}
              index={index}
              customBuild={customBuild}
              setCustomBuild={setCustomBuild}
            />
          ))}
          <button
            disabled={customBuild.length !== 8}
            type='button'
            onClick={
              customBuild?.length === 8
                ? () => setConfirmBuildModal(!confirmBuildModal)
                : () => {}
            }
            className='inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Create Build
          </button>
        </nav>
      </div>
      {customBuild.length ? (
        <BuildModal
          customBuild={customBuild}
          setCustomBuild={setCustomBuild}
          open={confirmBuildModal}
          setOpen={customBuild?.length === 8 ? setConfirmBuildModal : () => {}}
        />
      ) : null}
    </div>
  )
}
