import { description } from '../../../assets/icons'

export default function ModalDescription() {
  return (
    <div className='flex flex-col mt-3 gap-3'>
        <div className='flex gap-3 relative -left-9'>
            <span> { description } </span>
            <span className='font-medium'> Description </span>
        </div>
        <div>
            <textarea className='w-full bg-[rgba(149,148,148,0.2)] px-2 py-1 rounded-sm' placeholder='Add a more detailed description…'></textarea>
        </div>
    </div>
  )
}
