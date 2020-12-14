import React from 'react'

const Pagination = ({ currentPage, setCurrentPage, pageCount }) => {
    const pagination = []
    const limitOfButtons = 5
    let limitOfButtonsLeft = currentPage - Math.floor(limitOfButtons / 2)
    let limitOfButtonsRight = currentPage + Math.floor(limitOfButtons / 2)

    if (limitOfButtonsLeft <= 0) {
        limitOfButtonsLeft = 1
        limitOfButtonsRight = limitOfButtons
    }

    if (limitOfButtonsRight > pageCount) {
        limitOfButtonsRight = pageCount
    }

    for (let i = limitOfButtonsLeft; i <= limitOfButtonsRight; i += 1) {
        pagination.push(i)
    }

    return (
        <div className="pagination">
            {limitOfButtonsLeft !== 1 && (
                <div
                    className="pagItem border"
                    onClick={() => setCurrentPage(1)}
                >
                    {'<<'}
                </div>
            )}
            {pagination.map((i, k) => (
                <div
                    className={i === currentPage ? 'pagItem active' : 'pagItem'}
                    key={Number(k)}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </div>
            ))}

            {limitOfButtonsRight !== pageCount && (
                <div
                    className="pagItem border"
                    onClick={() => setCurrentPage(pageCount)}
                >
                    {'>>'}
                </div>
            )}
        </div>
    )
}

export default Pagination
