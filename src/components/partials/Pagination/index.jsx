import React from 'react'

const Pagination = ({ currentPage, setCurrentPage, pageCount }) => {
    const pagination = []

    for (let i = 1; i <= pageCount; i += 1) {
        pagination.push(i)
    }

    return (
        <div className="pagination">
            {pagination.map((i, k) => (
                <div
                    className={i === currentPage ? 'pagItem active' : 'pagItem'}
                    key={Number(k)}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </div>
            ))}
        </div>
    )
}

export default Pagination
