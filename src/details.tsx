import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Progress } from "@/components/ui/progress"


const DetailsPage: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (title) {
      fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=85ac5f2b`)
        .then((result) => result.json())
        .then((data) => {
          setMovie(data);
          {console.log(data)}
        });
    }
  }, [title]);

  if (!movie) {
    return <Progress className="ml-96 mt-60 w-96" value={60} />
    ;
  }

  return (
    <>
   <div  className="flex flex-row border border-solid border-gray-300 m-8 p-9">
   <img src={movie.Poster} alt={`${movie.Title} poster`} width="420" />
    <div className="p-5 my-10">
      <h1 className="text-4xl font-bold text-blue-800">{movie.Title}</h1><hr />
      <p>{movie.Plot}</p><br />
    
     <span className="flex items-center space-x-2">
     <h1 className="text-lg font-semibold">Year:</h1>
     <p>{movie.Year}</p>
     </span>
     <span className="flex items-center space-x-2">
     <h1 className="text-lg font-semibold">Genre:</h1>
     <p>{movie.Genre}</p>
     </span>
     <span className="flex items-center space-x-2">
     <h1 className="text-lg font-semibold">Actors:</h1>
     <p>{movie.Actors}</p>
     </span>
     <span className="flex items-center space-x-2">
     <h1 className="text-lg font-semibold">Country:</h1>
     <p>{movie.Country}</p>
     </span>
     <span className="flex items-center space-x-2">
     <h1 className="text-lg font-semibold">Language:</h1>
     <p>{movie.Language}</p>
     </span>
     <span className="flex items-center space-x-2">
     <h1 className="text-lg font-semibold">Runtime:</h1>
     <p>{movie.Runtime}</p>
     </span>
     <span className="flex items-center space-x-2">
     <h1 className="text-lg font-semibold">Type:</h1>
     <p>{movie.Type}</p>
     </span>
     <span className="flex items-center space-x-2">
     <h1 className="text-lg font-semibold">Director:</h1>
     <p>{movie.Director}</p>
     </span><br />
     <span className="flex items-center space-x-2">
     <h1 className="text-lg font-semibold">IMDB Rating:</h1>
     <p className='text-red-700 text-xl'>{movie.imdbRating}</p>
     </span>
     <img className='filter brightness-150 h-20 w-36 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyq5TccIv-NPjV4-__f4oBFp4QnyirdWre0Q&s" alt="" />
    </div>
   
   </div>
    
    </>
    
  );
};

export default DetailsPage;
