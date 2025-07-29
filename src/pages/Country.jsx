import React, { useEffect, useState, useTransition } from 'react'
import { getCountry } from '../api/CountryApiData'
import { Loader } from '../components/UI/Loader';
import { CountryCard } from '../components/Layout/CountryCard';

export const Country = () => {

  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState([]);

  useEffect(() =>{
    startTransition(async () => {
      const res = await getCountry();
      setCountry(res.data);
    })
  },[])

  if (isPending) return <Loader/>

  return (
    <section className='country-section'>
      <ul className='grid grid-four-cols'>
        {
          country.map((currCountry, index) => {
            return <CountryCard country={currCountry} key={index} />
          })
        }
      </ul>
    </section>
  )
}
