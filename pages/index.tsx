import Link from 'next/link'

const Homepage = () => (
  <>
    <Link passHref href="v1">
      <a>v1</a>
    </Link>
    <br />
    <Link passHref href="v2">
      <a>v2</a>
    </Link>
  </>
)

export default Homepage
