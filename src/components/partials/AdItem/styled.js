import styled from 'styled-components'

export const Item = styled.div`
    a {
        display: block;
        border: 1px solid #fff;
        margin: 10px;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        background: #fff;

        &:hover {
            border: 1px solid #ccc;
        }

        .itemImage img {
            width: 100%;
            height: 210;
            border-radius: 5px;
        }

        .itemName {
            color: #000;
            font-weight: bold;
        }

        .itemPrice {
            color: #000;
        }
    }
`
