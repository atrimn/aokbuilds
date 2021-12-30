/* This example requires Tailwind CSS v2.0+ */

import { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'

const ClassItem = ({ classes, setSelected, selected, setAbilities }) => {
  const conditionalClasses = (equalTo) =>
    selected?.class === equalTo ? 'bg-indigo-800' : 'bg-gray-800'

  return classes
    ? classes.map((classItem, index) => {
        return (
          <button
            key={classItem.class}
            onClick={() => {
              setSelected(classItem)
              setAbilities(classItem.data)
            }}
            type='button'
            className='col-span-1 h-[53px] flex flex-row-reverse justify-center'
          >
            <div
              className={`flex justify-center h-full items-center text-white flex-1 ${conditionalClasses(
                classItem.class
              )}  focus:outline-none focus:ring focus:ring-violet-300 active:bg-gray-700 hover:text-indigo-500`}
            >
              <p>{classItem.class}</p>
            </div>
            <div className=' bg-gray-900'>
              <img
                className='h-[53px]  bg-gray-900'
                src={classItem.data[index].imgUrl}
                alt='Mirage'
              />
            </div>
          </button>
        )
      })
    : null
}

export default function ClassSelection({
  classes,
  setAbilities,
  setCustomBuild,
}) {
  const [selectedClass, setSelectedClass] = useState('')

  useEffect(() => {
    setSelectedClass(classes[0])
    setAbilities(classes[0]?.data)
    // console.log(selectedClass)
  }, [classes])

  useEffect(() => {
    // console.log(selectedClass)
    setCustomBuild([])
  }, [selectedClass])

  return (
    <div className='bg-gray-900'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
        <p className='text-center text-base font-semibold uppercase text-white tracking-wider'>
          All Playable Classes
        </p>
        <div className='mt-6 grid grid-cols-2 gap-1 gap-x-3 md:grid-cols-5 lg:mt-8'>
          <ClassItem
            setSelected={setSelectedClass}
            selected={selectedClass}
            setAbilities={setAbilities}
            classes={classes}
          />
        </div>
      </div>
    </div>
  )
}
