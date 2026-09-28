import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalResults, onPageChange }) {
  // OMDb returns up to 10 results per page
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button 
        className="page-btn" 
        onClick={handlePrev} 
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
        <span>Previous</span>
      </button>
      
      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
      
      <button 
        className="page-btn" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
      >
        <span>Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
