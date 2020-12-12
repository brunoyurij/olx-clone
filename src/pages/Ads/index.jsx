import React, { useState, useEffect } from 'react'

import { useLocation, useHistory } from 'react-router-dom'
import { PageArea } from './styled'
import useApi from '../../helpers/OlxAPI'

import { PageContainer } from '../../components/MainComponents'

const AdPage = () => {
    const api = useApi()

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQueryString()

    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '')
    const [cat, setCat] = useState(
        query.get('cat') != null ? query.get('cat') : ''
    )
    const [state, setState] = useState(
        query.get('state') != null ? query.get('state') : ''
    )

    const [stateList, setStateList] = useState([])
    const [categories, setCategories] = useState([])

    React.useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates()
            setStateList(slist)
        }

        getStates()
    }, [])

    useEffect(() => {
        const getCategories = async () => {
            const cat = await api.getCategories()
            setCategories(cat)
        }

        getCategories()
    }, [])

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form action="GET">
                        <input
                            type="text"
                            name="q"
                            placeholder="Digite o que você procura"
                            value={q}
                            onChange={() => {}}
                        />

                        <div className="filterName">Estado: </div>
                        <select
                            name="state"
                            id="state"
                            value={state}
                            onChange={() => {}}
                        >
                            <option value="" />
                            {stateList.map((i, k) => (
                                <option value={i.name} key={Number(k)}>
                                    {i.name}
                                </option>
                            ))}
                        </select>

                        <div className="filterName">Categoria: </div>

                        <ul>
                            {categories.map((i, k) => (
                                <li
                                    key={Number(k)}
                                    className={
                                        cat == i.slug
                                            ? 'categoryItem active'
                                            : 'categoryItem'
                                    }
                                >
                                    <img src={i.img} alt="" />
                                    <span>{i.name}</span>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">...</div>
            </PageArea>
        </PageContainer>
    )
}

export default AdPage
