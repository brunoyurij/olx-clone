import React, { useState, useEffect } from 'react'

import { useLocation, useHistory } from 'react-router-dom'
import { PageArea } from './styled'
import useApi from '../../helpers/OlxAPI'
import AdItem from '../../components/partials/AdItem'
import Pagination from '../../components/partials/Pagination'

import { PageContainer } from '../../components/MainComponents'

const AdPage = () => {
    const api = useApi()
    const history = useHistory()
    const timer = React.useRef(null)

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
    const [addList, setAddList] = useState([])
    const [loading, setLoading] = useState(true)
    const [adsTotal, setAdsTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const getAdsList = async () => {
        setLoading(true)
        const limit = 2
        const offset = (currentPage - 1) * limit

        const json = await api.getAds({
            sort: 'desc',
            limit,
            q,
            cat,
            state,
            offset,
        })

        setAddList(json.ads)
        setAdsTotal(json.total)
        setLoading(false)
    }

    React.useEffect(() => {
        if (addList.length > 0) {
            setPageCount(Math.ceil(adsTotal / addList.length))
        } else {
            setPageCount(0)
        }
    }, [adsTotal])

    React.useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates()
            setStateList(slist)
        }

        getStates()
    }, [])

    React.useEffect(() => {
        const queryString = []

        if (q) {
            queryString.push(`q=${q}`)
        }

        if (cat) {
            queryString.push(`cat=${cat}`)
        }

        if (state) {
            queryString.push(`state=${state}`)
        }

        history.replace({
            search: `?${queryString.join('&')}`,
        })

        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(getAdsList, 2000)
        setCurrentPage(1)
    }, [q, cat, state])

    useEffect(() => {
        getAdsList()
    }, [currentPage])

    useEffect(() => {
        const getCategories = async () => {
            const catList = await api.getCategories()
            setCategories(catList)
        }

        getCategories()
    }, [])

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form>
                        <input
                            type="text"
                            name="q"
                            placeholder="Digite o que você procura"
                            value={q}
                            onChange={(e) => {
                                setQ(e.target.value)
                            }}
                        />

                        <div className="filterName">Estado: </div>
                        <select
                            name="state"
                            id="state"
                            value={state}
                            onChange={(e) => {
                                setState(e.target.value)
                            }}
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
                                        cat === i.slug
                                            ? 'categoryItem active'
                                            : 'categoryItem'
                                    }
                                    onClick={() => setCat(i.slug)}
                                >
                                    <img src={i.img} alt="" />
                                    <span>{i.name}</span>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultado</h2>

                    {loading && addList.length === 0 && (
                        <div className="listWarning">Carregando...</div>
                    )}

                    {!loading && addList.length === 0 && (
                        <div className="listWarning">
                            Não encontramos resultados
                        </div>
                    )}

                    <div className="list">
                        {addList.map((i, k) => (
                            <AdItem key={Number(k)} data={i} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageCount={pageCount}
                    />
                </div>
            </PageArea>
        </PageContainer>
    )
}

export default AdPage
