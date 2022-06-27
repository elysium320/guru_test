import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import Hero from '../models/Hero'
import { fetchHeroes } from '../store/heroes-slice'
const HeroTable = () => {
    const heroState = useAppSelector(state => state.heroes)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchHeroes())
    }, [])
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Heroes</td>
                        <td>Type</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {heroState.heroes.data.map((hero:Hero) => {
                    return (
                        <tr key={hero.id}>
                            <td><img src={hero.avatar} /><p>{hero.full_name}</p></td>
                            <td>{hero.type}</td>
                            <td>{hero.description}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default HeroTable
