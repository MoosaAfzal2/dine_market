import Hero from '@/app/widgets/Hero'
import Promotions from '@/app/widgets/Promotions'
import Products from '@/app/widgets/Products'
import DifferentFromOthers from '@/app/widgets/DifferentFromOthers'
import Subscribe from '@/app/widgets/Subscribe'

export default function Home() {
  return (
    <main>
      {/* Hero Sections */}
      <Hero />
      {/* Promotions Section */}
      <Promotions />
      {/* @ts-ignore Products Section */}
      <Products />
      {/* DifferentFromOthers Section */}
      <DifferentFromOthers />
      {/* Subscribe Section */}
      <Subscribe />
    </main>
  )
}
