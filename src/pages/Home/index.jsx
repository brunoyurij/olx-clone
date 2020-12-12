import React from 'react'
import { Link } from 'react-router-dom'
import { SearchArea, PageArea } from './styled'
import useApi from '../../helpers/OlxAPI'

import { PageContainer } from '../../components/MainComponents'
import AdItem from '../../components/partials/AdItem'

const Home = () => {
    const api = useApi()

    const [stateList, setStateList] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [addList, setAddList] = React.useState([])

    React.useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates()
            setStateList(slist)
        }

        getStates()
    }, [])

    React.useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories()
            setCategories(cats)
        }

        getCategories()
    }, [])

    React.useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit: 8,
            })

            setAddList(json.ads)
        }

        getRecentAds()
    }, [])

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input
                                type="text"
                                name="q"
                                placeholder="o que você procura?"
                            />
                            <select name="state" id="#id">
                                {stateList.map((i, k) => {
                                    return (
                                        <option value={i.name} key={Number(k)}>
                                            {i.name}
                                        </option>
                                    )
                                })}
                            </select>

                            <button type="submit">Pesquisar</button>
                        </form>
                    </div>

                    <div className="categoryList">
                        {categories.map((i, k) => (
                            <Link
                                key={Number(k)}
                                to={`/ads?cat=${i.slug}`}
                                className="categoryItem"
                            >
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        ))}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {addList.map((i, k) => (
                            <AdItem key={Number(k)} data={i} />
                        ))}
                    </div>
                    <Link to="/ads" className="seeAllLink">
                        Ver todos
                    </Link>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Adipisci, fugit nihil itaque quod consequatur
                        beatae natus nemo illo placeat delectus quisquam neque
                        nobis saepe eligendi iure nostrum facere cumque numquam!
                    </p>
                </PageArea>
            </PageContainer>
        </>
    )
}

export default Home
