import React from 'react';
import { Link } from 'react-router-dom';

const PageControl = ({page, urlBase}) => {
  const currentPage = Number(page.pageNum);
  const totalPages = Number(page.totalPages);
  let pages;
  console.log(totalPages);
  if (totalPages <= 5) {
    pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (currentPage < 5) {
    pages = [1, 2, 3, 4, 5, 'spacer1', totalPages];
  } else if (currentPage > totalPages - 4) {
    pages = [1, 'spacer1', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  } else {
    pages = [1, 'spacer1', currentPage - 2, currentPage - 1, currentPage - 0, currentPage + 1, currentPage + 2, 'spacer2', totalPages];
  }
  
  const pageLinks = pages.map(index => {
    if (index === 'spacer1' || index === 'spacer2') {
      return <div key={index} className="page-number-divider">...</div>;
    } else {
      return <Link key={index} className={`page-number ${index === currentPage ? 'page-number-current': ''}`} to={`/${urlBase}/page/${index}`}>{index}</Link>;
    }
  });
    
  return (
    <div className="page-control">
      { currentPage > 1 && 
        <Link className="page-number" to={`/${urlBase}/page/${currentPage - 1}`}>prev</Link>
      }
      { pageLinks }
      { currentPage < totalPages &&
        <Link className="page-number" to={`/${urlBase}/page/${currentPage + 1}`}>next</Link>
      }
    </div>
  );
};

export default PageControl;