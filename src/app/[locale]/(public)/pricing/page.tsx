import React from 'react'
import PricingPage from './_components/plansPage'
import { getPlans } from '@/data/plans'

const Pricing = async () => {
  const plans = await getPlans()
  return (
    <div>
      <PricingPage plans = {plans}/>
    </div>
  )
}

export default Pricing
