    const CardsContainer = document.getElementById('cards');
    const nextButton = document.getElementById('nextButton');
    const backTopBtn = document.getElementById('btn-back-top');

    const layout = 'col-sm-5 col-md-3 col-lg-2 '

    
    let urlChar = 'https://rickandmortyapi.com/api/character?page=1';
        


    const fetchCharacter = async(urlChar) => {

     await fetch( urlChar )
     .then(resp => resp.json())
      .then(data => {
        renderCard(data);
        changePage(data)
        const { info, results } = data;
        console.log({ info,results });
        
      })
      .catch(console.warn)


    }

    fetchCharacter(urlChar);




    
    const renderCard = (data) =>{
      const {  results } = data;

      results.forEach( char => {
          charCard( char )
      })

    }


   
    const charCard = ( char ) => {

        
      
        const card = document.createElement('div')  
        const imageContainer = document.createElement('div');
        const imageCard = document.createElement('img');

        card.setAttribute('class', `card ${layout}  mb-3`)
        imageCard.setAttribute('src', char.image);
        imageCard.setAttribute('class', 'card-img-top');
        imageContainer.appendChild(imageCard);
        card.appendChild(imageContainer)
        CardsContainer.appendChild(card);
        

       renderDataCard( char, card );


    }

    const renderDataCard = ( char, card ) => {

       const containerData = document.createElement('div');
       const containerName = document.createElement('div');
       const containerLocation = document.createElement('div');
       const containerSpecie = document.createElement('div');

       const name = document.createElement('h3');
       const descLocation = document.createElement('h5');
       const lastLocation = document.createElement('h3');
       const descSpecie = document.createElement('h5');
       const specie = document.createElement('h3');

       containerData.setAttribute('class', 'card-body');
       name.textContent = char.name;
       descLocation.textContent = 'Last known location:'
       lastLocation.textContent = char.location.name;
       descSpecie.textContent = 'Specie';
       specie.textContent =  char.species;

       containerName.appendChild(name);
       containerLocation.appendChild(descLocation);
       containerLocation.appendChild(lastLocation);
       containerSpecie.appendChild(descSpecie);
       containerSpecie.appendChild(specie);

       containerData.appendChild(containerName);
       containerData.appendChild(containerLocation);
       containerData.appendChild(containerSpecie);

      card.appendChild(containerData);

    }

    const changePage = ( {info} ) => {
      nextButton.setAttribute('data-url', info.next );
      

    }

   
    nextButton.addEventListener('click', (e)=>{
      if(e.target.classList.contains('btn')) {

        let value = e.target.dataset.url;
        console.log(value)
        fetchCharacter(value);
      }
    })

    



     window.addEventListener('scroll', (e) => {
         const scrollDowm = window.scrollY;
         console.log(scrollDowm)
        
         hideButton(scrollDowm);
         backTop(scrollDowm);

     })

     const hideButton = (scrollDowm) => {

       ( scrollDowm < 1000 ) ? backTopBtn.style.display = 'none' : null ;

     }

     const backTop = (scrollDowm) => {

       ( scrollDowm > 1000 ) ? backTopBtn.style.display = 'block' : null ;

     }

    // prevButton.addEventListener('click', (e)=>{
    //   if(e.target.classList.contains('btn')){

    //     let value = e.target.dataset.url;
    //     console.log(value)
    //     fetchCharacter(value);
    //   }
    // })

