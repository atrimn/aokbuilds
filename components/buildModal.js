/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { createBuild } from '../firebase'

export default function Example({
  skill,
  open,
  setOpen,
  customBuild,
  setCustomBuild,
}) {
  const [buildName, setBuildName] = useState('')
  const [error, setError] = useState(false)
  const cancelButtonRef = useRef(null)

  const createBuildHandler = async () => {
    const result = await createBuild(customBuild, buildName)
    setOpen(false)
    setError(false)
    setCustomBuild([])
  }

  useEffect(() => {
    console.log(buildName.length)
    console.log(error)
  }, [buildName, error])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-red-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle '>
              <div className='bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 font-medium text-indigo-500'
                    >
                      Custom Build
                    </Dialog.Title>
                    <label
                      htmlFor='build-name'
                      className='block text-sm font-medium text-violet-500'
                    >
                      Build Name
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        value={buildName}
                        onChange={(e) => setBuildName(e.target.value)}
                        name='build-name'
                        id='build-name'
                        className={`shadow-sm
                        focus:ring-indigo-500 focus:border-indigo-500 mb-4 block sm:text-sm border-gray-300 rounded-md  ${
                          error ? ' border-rose-500 border-2' : ''
                        } `}
                        placeholder='Atrimns Mystic Build'
                      />
                    </div>
                    <div className='flex'>
                      {customBuild.map((item, index) => (
                        <button
                          key={index}
                          type='button'
                          className='relative bg-gray-800 block w-[53px] h-[53px] border-2 overflow-hidden  border-gray-300 border-dashed rounded-lg  text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                          <img
                            key={index}
                            src={customBuild[index]?.ability?.imgUrl}
                            className='h-[53px] w-[53px]'
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md  shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
                <button
                  // disabled={buildName.length > 5 ? false : true}
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md  shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={
                    buildName.length > 0
                      ? () => createBuildHandler()
                      : () => setError(true)
                  }
                  ref={cancelButtonRef}
                >
                  Create
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
