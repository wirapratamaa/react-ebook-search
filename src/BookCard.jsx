import React, { useState } from 'react'
import { Button, Card, Modal,  } from 'react-bootstrap';

const BookCard = ({
    thumbnail,
    title,
    pageCount,
    language,
    authors,
    publisher,
    description,
    previewLink,
    infoLink
}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <Card style={{ width: '233px' }} className='m-auto'>
            <Card.Img top style={{ width: '100%', height: '233px' }} src={thumbnail} alt="card image" />
            <Card.Body>
                <Card.Title className='card-title'>{title}</Card.Title>
                <Button onClick={handleShow}>More Info</Button>
            </Card.Body>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title centered>{title}</Modal.Title>
                </Modal.Header>
                <div className="d-flex justify-content-between ml-5" >
                    <img src={thumbnail} alt={title}/>
                    <div className="mr-5">
                        <Modal.Body>Page Count : {pageCount}</Modal.Body>
                        <Modal.Body>Language : {language}</Modal.Body>
                        <Modal.Body>Authors : {authors}</Modal.Body>
                        <Modal.Body>Publisher : {publisher}</Modal.Body>
                    </div>
                </div>
                <Modal.Body>{description}</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" href={previewLink}>
                    Preview Link
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" href={infoLink}>
                    Info Link
                </Button>
                </Modal.Footer>
            </Modal>
        </Card>;

};

export default BookCard
