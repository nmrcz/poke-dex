import React, { useState } from 'react'
import { Col } from 'react-bootstrap'

const Pagination = ({ pokesPerPage, totalPokes, paginate}) => {
  const pageNumbers = []
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(3)
  const [activePage, setActivePage] = useState(1)

  for (let i = 1; i < Math.ceil(totalPokes / pokesPerPage); i++){
    pageNumbers.push(i)
  }

  const prevPage = () => {
    setStartIndex(startIndex - 3)
    setEndIndex(endIndex - 3)
  }
  const nextPage = () => {
    setStartIndex(startIndex + 3)
    setEndIndex(endIndex + 3)
  }
  const currPage = (number) => {
    setActivePage(number)
  }

  return (
    <> 
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center d-flex flex-wrap ">
                {startIndex > 0 && <li onClick={() =>prevPage()} className="page-item m-1 text-center"><a className="page-link rounded" href="#!">Previous</a></li>}
                {pageNumbers.slice(startIndex, endIndex).map(number => (
                    //xs={12} sm={12} md={4} lg={3} xl={2}>
                    <Col key={number} className='page-item' xs={2} sm={2} md={2} lg={2} xl={2}>
                        <li className={(activePage === number) ? "page-item m-1 text-center active" : "page-item m-1 text-center"} onClick={()=>currPage(number)}>
                            <a onClick={() =>paginate(number)} className="page-link" href="#!">
                                #{(number * pokesPerPage) - pokesPerPage + 1} - {number * pokesPerPage}
                            </a>
                        </li>
                    </Col>
                ))}
                {endIndex < 74 &&<li onClick={() =>nextPage()}className="page-item m-1 text-center"><a className="page-link rounded" href="#!">Next</a></li>}
            </ul>
        </nav>
    </>
  )
}

export default Pagination