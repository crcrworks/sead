type ClassCardProps = {
  title: string
  isSelect: boolean
}

export const ClassCard = (props: ClassCardProps) => {
  const { title, isSelect } = props

  return (
    <div className='border-black flex h-36 w-36 cursor-pointer flex-col items-center rounded-md border transition-all hover:bg-yellow'>
      <p className='mx-3 my-2 text-xl'>{title}</p>
    </div>
  )
}
