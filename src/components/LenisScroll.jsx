import { ReactLenis, useLenis } from 'lenis/react'

function LenisScroll() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  return (
    <ReactLenis root>
      { /* content */ }
    </ReactLenis>
  )
}

export default LenisScroll;