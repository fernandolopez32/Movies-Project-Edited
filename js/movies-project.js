"use strict"
// alert("Welcome to the movies project");

$(function(){

//URL constants:



    const moviesURL = "https://stingy-prickle-sternum.glitch.me/movies"



    /*=====================FUNCTION THAT PRODUCES MOVIE CARDS=============*/

    function getMovies(){
        fetch("https://stingy-prickle-sternum.glitch.me/movies")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                $("#movies").empty();
                data.forEach((movie, index) => {
                    $("#movies").append(`
                    <div class="card col-4 mx-auto px-0 mb-4" data-id="${movie.id}" style="width: 18rem;">
                        <img src="${movie.poster}" class="card-img-top " alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Title: ${movie.title} (${movie.year})</h5>
                            <p class="card-text">${movie.plot}</p>
                            <button id="edit${movie.id}" class="button btn-primary">Edit</button>
                            <button id="delete${movie.id}" class="button btn-danger">Delete</button>
                        </div>
                        
                      <div class="editForm hiddenForm px-2 pb-3">
                            <label for="title" class="form-label">Movie Title</label>
                            <input type="title" class="form-control" id="title${movie.id}" placeholder="What is your favorite movie">
                            
                            <label for="yearMade" class="form-label">Year</label>
                            <input id="yearMade${movie.id}" class="form-control" placeholder="Year made">
                            
                            <label for="plot" class="form-label">Plot</label>
                            <input id="plot${movie.id}" class="form-control" placeholder="Plot">
                            
                            <button id="submit${movie.id}" type="submit">Submit</button>
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
                        fetch(moviesURL + "/"+ movie.id, deleteOptions).then(getMovies)
                    });

                    $(`#edit${movie.id}`).on('click',function (){
                        $(this).parent().next().toggleClass('hiddenForm')
                    })


//selecting the button  in the form so that on click of the submit button the card info changes

                    $(`#submit${movie.id}`).on('click',function (){
                        // alert(`You clicked on the ${movie.id} button!`)
                        let modification = {
                            title: $(`#title${movie.id}`).val(),
                            year: $(`#yearMade${movie.id}`).val(),
                            plot: $(`#plot${movie.id}`).val()
                        }
                        const patchOption ={
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(modification)
                        }
                        fetch(moviesURL +"/"+ movie.id, patchOption).then(getMovies)
                    })


                })
            });
        }//End of getMovies Function

/*======================MODIFYING TITLES===================*/

    let modifyDown = {
        title: "Black Hawk Down"
    }

    let modifyTenet = {
        title: "Tenet"
    }

    const patchTenet = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modifyTenet)
    }

    const patchDown = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modifyDown)
    }

    fetch(moviesURL+ "/2", patchDown).then(getMovies);


    /*=================ADDING A MOVIE FUNCTION==========================*/
//
    function postMovie() {
        $("#userFavMovie").keyup(function (e) {
            let usersMovie;
            if (e.key === "Enter") {
                usersMovie = $(this).val();
                theMoviesDataBaseURL(usersMovie);
            }
        })
    }

    postMovie()

    let poster;
    function theMoviesDataBaseURL(userSearch){
        fetch(`https://api.themoviedb.org/3/search/movie${J_TBD_TOKEN}&query=${userSearch}&include_adult=false`)
            .then(response => response.json())
            .then(data => {
                poster = 'https://image.tmdb.org/t/p/w300'
                console.log(data.results[0]);
                console.log(data.results[0].poster_path)
                let usersMovie = {
                    title: `${data.results[0].title}`,
                    poster: `${poster}${data.results[0].poster_path}`,
                    year: `${data.results[0].release_date.split("-")[0]}`,
                    plot: `${data.results[0].overview}`


                }
                console.log(poster);
                console.log(usersMovie)
                let putOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usersMovie)
                }
                fetch(moviesURL, putOptions).then(getMovies)
            })
    }


})//End of document.ready