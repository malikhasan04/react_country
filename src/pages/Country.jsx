import React, { useEffect, useState, useTransition } from 'react'
import { getCountry } from '../api/CountryApiData'
import { Loader } from '../components/UI/Loader';
import { CountryCard } from '../components/Layout/CountryCard';
import { SearchFilter } from '../components/UI/SearchFilter';

export const Country = () => {

  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState([]);

  const [search, setSearch] = useState();
  const [filter, setFilter] = useState("all");

  useEffect(() =>{
    startTransition(async () => {
      const res = await getCountry();
      setCountry(res.data);
    })
  },[])

  if (isPending) return <Loader/>


  const searchCountry = (country) => {
    if(search){
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }  
    return country;
  }

  const searchFilter = (country) => {
    if(filter === "all") return country;
    return country.region === filter;
  }
  
  const filterCountry = country.filter((country) => searchCountry(country) && searchFilter(country))
  
  return (
    <section className='country-section'>
      <SearchFilter search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} country={country} setCountry={setCountry} />
      <ul className='grid grid-four-cols'>
        {
          filterCountry.map((currCountry, index) => {
            return <CountryCard country={currCountry} key={index} />
          })
        }
      </ul>
    </section>
  )
}
