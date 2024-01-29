import Masonry from 'react-masonry-css'
import Clothes from './Clothes'

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

const MasonryLayout = ({ clothes }) => {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
      {clothes?.map((clothes) => <Clothes key={clothes._id} clothes={clothes} className='w-max' />)}
    </Masonry>
  )
}

export default MasonryLayout