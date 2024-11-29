import React, { useState, FormEvent, useEffect } from 'react';
import { Movie } from './types'; 
import { useNavigate } from 'react-router-dom'; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const MainPage: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const moviesPerPage = 8;
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const storedResults = localStorage.getItem('movieSearchResults');
    if (storedResults) {
      setData(JSON.parse(storedResults)); 
    }
  }, []);

  const handler = (e: FormEvent) => {
    e.preventDefault();
    fetch(`https://www.omdbapi.com/?s=${search}&apikey=85ac5f2b`)
      .then((result) => result.json())
      .then((value) => {
        if (value.Search) {
          setData(value.Search);
          localStorage.setItem('movieSearchResults', JSON.stringify(value.Search)); // Store the results in localStorage
          setCurrentPage(1); // Reset to page 1 on new search
        } else {
          setData([]);
          localStorage.removeItem('movieSearchResults'); // Remove the search results from localStorage if no results found
        }
      });
  };

  const totalPages = Math.ceil(data.length / moviesPerPage);
  
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = data.slice(startIndex, startIndex + moviesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div >
      <form onSubmit={handler} className='flex flex-row justify-between'>
        <img className="filter brightness-110 h-20 w-36 ml-2" width="100"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqYXw6WM7TwYDjIoIgdhNywvwiFztAPpdzGQ&s" alt="" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a movie........"
          className='w-full p-0.5 h-10 m-3 text-end border border-solid border-gray-200 rounded-2xl'
        />
        <input className="h-fit my-5" type="submit" value="" />
        <Avatar className='my-3.5 mt-4 size-8'>
        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&s" />
        <AvatarFallback>CN</AvatarFallback>
        </Avatar>

      </form>

      <div className="movie-list grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 border border-solid border-gray-300 p-5 mx-1.5">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie, index) => (
            <Card
              key={index}
              onClick={() => navigate(`/details/${encodeURIComponent(movie.Title)}`)} // Navigate to movie details page on click
              className="cursor-pointer flex flex-col items-center bg-gray-50 justify-center text-center p-4"
            >
              <CardHeader>
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                  width="250"
                  className="rounded-md"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-blue-800 text-xl font-bold">{movie.Title}</CardTitle>
                <CardDescription>Year: {movie.Year}</CardDescription>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center p-56 mx-80 font-bold flex flex-row">No_Results_Found</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-4 flex justify-center">
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
          >
            Previous
          </PaginationPrevious>
          
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'bg-blue-600 text-white text-xs' : 'bg-white text-black'}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationNext
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            className={currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}
          >
            Next
          </PaginationNext>
        </Pagination>
      )}
      <hr />
      <footer className='p-3 text-center'>@2024 Movie Rules</footer>    
    </div>
  );
};

export default MainPage;
