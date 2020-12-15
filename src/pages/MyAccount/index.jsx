import React from 'react'
import { PageContainer } from '../../components/MainComponents'
import { PageArea } from './styled'
import useApi from '../../helpers/OlxAPI'

const MyAccount = () => {
    const api = useApi()

    React.useEffect(() => {
        const getUserInfo = async () => {
            const json = await api.getUserInfo()
            console.log(json)
        }

        getUserInfo()
    }, [])
    return (
        <PageContainer>
            <PageArea>
                <h1>Teste</h1>
            </PageArea>
        </PageContainer>
    )
}

export default MyAccount
