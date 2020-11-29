import { useState } from 'react';
import { FormControl, InputGroup, Button, Form, Spinner } from 'react-bootstrap';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import BookCard from './BookCard';

function App() {
  //state
  const [maxResults, setMaxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const handleSubmit = () =>{
    setLoading(true);
    if (maxResults > 40 || maxResults < 1) {
      toast.error("Max results must be between 1 and 40");
    }else {
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`)
      .then(res => {
        if (startIndex >= res.data.totalItems || startIndex < 1) {
          toast.error(
            `Start index must be between 1 and ${res.data.totalItems}`
            );
        } else{
          if (res.data.items.length > 0) {
            setCards(res.data.items);
            setLoading(false);
          }
        }
      })
      .catch(err => {
        setLoading(true)
        toast.error(`${err.response.data.error.message}`)
      })
    }

  }
  
  const mainHeader = () => {
    return(
      <div className="main-image d-flex justify-content-center align-items-center flex-column">
        <div className="filter">

        </div>
        <h1 className="display-2 text-center text-white mb-3" style={{ zIndex: 2 }}>
          Find your Book
        </h1>
        <div  style={{ width: '60%', zIndex: 2 }}>
          <InputGroup size='lg' className='mb-3'>
            <FormControl placeholder='Book Search' value={ query } onChange={ e => setQuery(e.target.value) }/>
            <Button onClick={handleSubmit}>
                <i className='fas fa-search'></i>
            </Button>
          </InputGroup>
          <div className="d-flex text-white justify-content-center">
            <Form.Group className='ml-5'>
              <Form.Label for='maxResults' >Max Results</Form.Label>
              <FormControl type='number' id='maxResults' placeholder='Max Results' value={ maxResults } onChange={ e => setMaxResults(e.target.value)}/>
            </Form.Group>
            <Form.Group className='ml-5'>
              <Form.Label for='startIndex'>Start Index</Form.Label>
              <FormControl type='number' id='startIndex' placeholder='Start Index'  value={ startIndex } onChange={ e => setStartIndex(e.target.value)}/>
            </Form.Group>
          </div>
        </div>
      </div>
    );
  }

  const handleCards = () => {
    const items =cards.map((item, i) =>{
      let thumbnail='';
      if (item.volumeInfo.imageLinks.thumbnail) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail;
      }
      return(
        <div className="col-lg-4 mb-3" key={item.id}>
          <BookCard 
            thumbnail={thumbnail}
            title={item.volumeInfo.title}
            pageCount ={item.volumeInfo.pageCount}
            language ={item.volumeInfo.language}
            authors ={item.volumeInfo.authors}
            publisher ={item.volumeInfo.publisher}
            description ={item.volumeInfo.description}
            previewLink ={item.volumeInfo.previewLink}
            infoLink ={item.volumeInfo.infoLink}
          />
        </div>
      )
    })
    if (loading) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Spinner style={{ width: '3rem', height: '3rem' }}/>
        </div>
      )
    }else {
      return (
        <div className="container my-5">
          <div className="row">
            {items}
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      {mainHeader()};
      {handleCards()};
      <ToastContainer />
    </div>
  );
}

export default App;
