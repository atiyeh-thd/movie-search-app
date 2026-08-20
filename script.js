async function film(){
            let movieName = document.getElementById("name").value.trim();
            let movieDiv = document.getElementById("movie");

            if(!movieName){
                document.getElementById("movie").innerHTML = `<p style="color:red;">Please enter the movie name</p>`;
                return;
            }

            movieDiv.innerHTML = `<p>Searching...</p>`;

            try{
                let response = await fetch(`https://www.omdbapi.com/?t=${movieName}&plot=full&apikey=961bfb5b`);
                let data = await response.json();

                if(data.Response === "False"){
                    movieDiv.innerHTML = `
                        <p style="color:red; font-weight:bold;">
                             No film with this name was found.
                        </p>
                    `;
                    return;
                }

                document.getElementById("movie").innerHTML = `
                    <div class="movie-card">
                        <h3>${data.Title}</h3>
                        <p>Year: ${data.Year}</p>
                        <p>Genre: ${data.Genre}</p>
                        <p>Director: ${data.Director}</p>
                        <p>Score: ${data.imdbRating} </p>
                        <img src="${data.Poster}" width="200"/>
                    </div>
                `;

            }catch(error){
                movieDiv.innerHTML = `
                    <p style="color:red;">
                         Error retrieving data. Check your internet connection... 
                    </p>
                `;
                console.log(error);
            }
        }
