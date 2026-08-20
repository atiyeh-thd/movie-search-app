async function film(){
            let movieName = document.getElementById("name").value.trim();
            let movieDiv = document.getElementById("movie");

            if(!movieName){
                document.getElementById("movie").innerHTML = `<p style="color:red;">لطفاً نام فیلم را وارد کنید</p>`;
                return;
            }

            movieDiv.innerHTML = `<p>⏳ در حال جستجو...</p>`;

            try{
                let response = await fetch(`https://www.omdbapi.com/?t=${movieName}&plot=full&apikey=961bfb5b`);
                let data = await response.json();

                if(data.Response === "False"){
                    movieDiv.innerHTML = `
                        <p style="color:red; font-weight:bold;">
                            ❌ فیلمی با این نام پیدا نشد
                        </p>
                    `;
                    return;
                }

                document.getElementById("movie").innerHTML = `
                    <div class="movie-card">
                        <h3>${data.Title}</h3>
                        <p>سال: ${data.Year}</p>
                        <p>ژانر: ${data.Genre}</p>
                        <p>کارگردان: ${data.Director}</p>
                        <p>امتیاز: ⭐ ${data.imdbRating}</p>
                        <img src="${data.Poster}" width="200"/>
                    </div>
                `;

            }catch(error){
                movieDiv.innerHTML = `
                    <p style="color:red;">
                        ⚠️ خطا در دریافت اطلاعات. اتصال اینترنت را بررسی کنید.
                    </p>
                `;
                console.log(error);
            }
        }