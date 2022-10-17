
$(function(){
    /*=====================URL CONSTANTS=============*/
    const moviesURL = 'https://iron-quirky-laser.glitch.me/movies'
    const tmdbURL = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_F_TOKEN}&language=en-US&query=up&page=1&include_adult=false`


    /*=====================USER INPUT VARIABLE=============*/
    // let usersMovie
    // $('#userFavMovie').keyup('Enter',function (e){
    //     if(e.key === 'Enter')
    //         usersMovie = $(this).val()
    //     return usersMovie
    // })


    /*=====================GETTING MOVIES FROM GLITCH API=============*/
const glitchAPICall = fetch(moviesURL);


    glitchAPICall
        .then(resp => resp.json())
        .then(data =>{
            console.log(data)
            printMovieCards(data);
        })


    glitchAPICall.catch(error => console.log(error));

    function printMovieCards (data){
        data.forEach(movie => {
            $("#movies").append(`
                    <div class="card col-md-6 mx-auto px-0 mb-4" data-id="${movie.id}">
                        <img src="${movie.poster}" class="card-img-top movieImage" alt="Movie Poster">
                        <div class="poster-bottom opacity-75">
                            <div class="card-body">
                                <h5 class="card-title">Title: ${movie.title} (${movie.year})</h5>
                                <p class="card-text">${movie.plot}</p>
                                <p class="card-text">Rating: ${movie.rating}</p>
                                <button id="edit${movie.id}" class="button btn-primary">Edit</button>
                                <button id="delete${movie.id}" class="button btn-danger">Delete</button>
                            </div>

                            <div class="editForm hiddenForm px-2 pb-3">
                                <label for="title" class="form-label">Movie Title</label>
                                <input type="title" class="form-control" id="title${movie.id}" placeholder="Rename the Movie!">

                                <label for="yearMade" class="form-label">Year</label>
                                <input id="yearMade${movie.id}" class="form-control" placeholder="Change the Year it was made!">

                                <label for="plot" class="form-label">Plot</label>
                                <input id="plot${movie.id}" class="form-control" placeholder="Write you own plot!">

                                <label for="rating" class="form-label">Rating</label>
                                <input id="rating${movie.id}" class="form-control" placeholder="Rate it!">

                                <button id="submit${movie.id}" type="submit">Submit</button>
                            </div>

                        </div>
                    </div>
                    `)
                $(`#delete${movie.id}`).on("click", function () {
                    const deleteOptions = {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "applications/json"
                        }
                    }
                    fetch(moviesURL + "/"+ movie.id, deleteOptions).then(printMovieCards)
                });


        })
        postMovie();
    }

//     function getMovies(){
//         fetch("https://stingy-prickle-sternum.glitch.me/movies")
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data)
//                 $("#movies").empty();
//                 data.forEach((movie, index) => {
//                     $("#movies").append(`
//                     <div class="card col-md-6 mx-auto px-0 mb-4" data-id="${movie.id}">
//                         <img src="${movie.poster}" class="card-img-top movieImage" alt="Movie Poster">
//                         <div class="poster-bottom opacity-75">
//                             <div class="card-body">
//                                 <h5 class="card-title">Title: ${movie.title} (${movie.year})</h5>
//                                 <p class="card-text">${movie.plot}</p>
//                                 <p class="card-text">Rating: ${movie.rating}</p>
//                                 <button id="edit${movie.id}" class="button btn-primary">Edit</button>
//                                 <button id="delete${movie.id}" class="button btn-danger">Delete</button>
//                             </div>
//
//                             <div class="editForm hiddenForm px-2 pb-3">
//                                 <label for="title" class="form-label">Movie Title</label>
//                                 <input type="title" class="form-control" id="title${movie.id}" placeholder="Rename the Movie!">
//
//                                 <label for="yearMade" class="form-label">Year</label>
//                                 <input id="yearMade${movie.id}" class="form-control" placeholder="Change the Year it was made!">
//
//                                 <label for="plot" class="form-label">Plot</label>
//                                 <input id="plot${movie.id}" class="form-control" placeholder="Write you own plot!">
//
//                                 <label for="rating" class="form-label">Rating</label>
//                                 <input id="rating${movie.id}" class="form-control" placeholder="Rate it!">
//
//                                 <button id="submit${movie.id}" type="submit">Submit</button>
//                             </div>
//
//                         </div>
//                     </div>
//                     `)
//                     $(`#delete${movie.id}`).on("click", function () {
//                         const deleteOptions = {
//                             method: "DELETE",
//                             headers: {
//                                 "Content-Type": "applications/json"
//                             }
//                         }
//                         fetch(moviesURL + "/"+ movie.id, deleteOptions).then(getMovies)
//                     });
//
//                     $(`#edit${movie.id}`).on('click',function (){
//                         $(this).parent().next().toggleClass('hiddenForm')
//                     })
//
//
//
// //selecting the button  in the form so that on click of the submit button the card info changes
//
//                     $(`#submit${movie.id}`).on('click',function (){
//                         // alert(`You clicked on the ${movie.id} button!`)
//                         let modification = {
//                             title: $(`#title${movie.id}`).val(),
//                             year: $(`#yearMade${movie.id}`).val(),
//                             plot: $(`#plot${movie.id}`).val(),
//                             rating: $(`#rating${movie.id}`).val()
//                         }
//                         const patchOption ={
//                             method: 'PATCH',
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             },
//                             body: JSON.stringify(modification)
//                         }
//                         fetch(moviesURL +"/"+ movie.id, patchOption).then(getMovies)
//                     })
//
//
//                 })
//             });
//         }//End of getMovies Function


let poster = 'https://image.tmdb.org/t/p/w300'
           /*=================ADDING A MOVIE FUNCTION==========================*/
    function postMovie() {
        $("#userFavMovie").keyup(function (e) {
            let usersMovie;
            if (e.key === "Enter") {
                usersMovie = $(this).val();
                theMoviesDataBaseURL(usersMovie);
            }
        })
    }
     /*================= ADDING NEW CARDS WITH TMDB_API POST METHOD =======================*/
    function theMoviesDataBaseURL(userSearch){
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_F_TOKEN}&query=${userSearch}&include_adult=false`)
            .then(response => response.json())
            .then(data => {
                console.log(data.results[0].title)
                let usersMovie = {
                    title: `${data.results[0].title}`,
                    poster: `${poster}${data.results[0].poster_path}`,
                    year: `${data.results[0].release_date.split("-")[0]}`,
                    plot: `${data.results[0].overview}`
                }
                let putOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usersMovie)
                }
                fetch(moviesURL, putOptions).then(postMovie)
            })
    }



});