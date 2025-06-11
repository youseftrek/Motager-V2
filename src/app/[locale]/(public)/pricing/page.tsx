import React from 'react'
import PricingPage from './_components/plansPage'
import { getPlans } from '@/data/plans'
import { getUser } from '@/data/user'
import { useAuth } from '@/hooks'
import { getSession } from '@/actions/get-session'

const Pricing = async () => {
  const plans = await getPlans()
  const userSession = await getSession()
  const user =  await getUser(String(userSession.user?.user_id) , userSession.token ?? '' )
  return (
    <div>
      <PricingPage plans = {plans} user={user}/>
    </div>
  )
}

export default Pricing
