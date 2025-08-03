import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, ListGroup, Modal, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom'

export const Detail = () => {
    const {slug} = useParams();
    const [data,setData] = useState([]);
    const [getDataChapter,setDataChapter] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [IsModelOpen,setIsModelOpen] = useState(false);
    const item = data?.data?.data?.item;
    useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`);
        setData(response);
        setLoading(false);
        console.log(response);
      }catch(error){
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  },[slug]);
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  const handleClose = () => setIsModelOpen(false);
  const handleReadChapter = async(chapter_api)=>{
    try{
        const response = await axios.get(`${chapter_api}`);
        setDataChapter(response.data);
        setLoading(false);
        console.log(response);
      }catch(error){
        setError(error.message);
        setLoading(false);
      }
    setIsModelOpen(true)
  }
  return (
    <div>
        <Helmet>
        <title>{data.data.data.seoOnPage.titleHead}</title>
      </Helmet>
      <Container>
        <Button as={Link} to="/">Back to Home</Button>
        <Row>
            <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  {data.data.data.seoOnPage.titleHead}
                </Card.Title>
                {data.data.data.seoOnPage.descriptionHead}
              </Card.Body>
            </Card>
            </Col>
        </Row>
        <Row>
            <Col>
            <Card style={{width:"30rem"}} >
            <Card.Img variant='top' src={`https://otruyenapi.com/uploads/comics/${item.thumb_url}`} />
              <Card.Body>
                <Card.Title>{item.name || "No Item"}</Card.Title>
                <Card.Title dangerouslySetInnerHTML={{__html: item.content }}></Card.Title>
                <Card.Text>{item.UpdateAt || "No Item"}</Card.Text>
                <Card.Text>{item.status || "No status"}</Card.Text>
                <Card.Text>
                  {item.Category && item.Category.length > 0 ? (item.Category.map((Category,index)=>(
                    <Badge bg='info' key={index}>
                      {Category.name}
                    </Badge>
                  ))):(
                    "Orther"
                  )}
                  
                </Card.Text>
                <Card.Text>
                  {item.author && item.author.length > 0 ? (item.author.map((author,index)=>(
                    <Badge bg='info' key={index}>
                      {author.name}
                    </Badge>
                  ))):(
                    "Orther"
                  )}
                  
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{width:"30rem"}}>
                <ListGroup className='scrollable-list'>
                     {item.chapters && item.chapters.length > 0 ? (item.chapters.map((chapter,index)=>(
                        <div key={index}>
                            <h5>chapters.server_name</h5>
                            <ListGroup.Item>
                                 {chapter.server_data && chapter.server_data.length > 0 ? (chapter.server_data.map((listChapters,subIndex)=>(
                                   <div className='chapter_click' key={subIndex} onClick={()=>handleReadChapter(listChapters.chapter_api_data)}>
                                        chapter : {listChapters.chapter_name}
                                   </div>
                                 ))):(
                                   <span>Chapter comming soon...</span>
                                 )}
                            </ListGroup.Item>
                        </div>
                      ))):(
                        <span>Chapter comming soon...</span>
                      )}
                    
                </ListGroup>
            </Card>
          </Col>
        </Row>
        {
            IsModelOpen && (
                <Modal show={IsModelOpen} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Chapter {getDataChapter.data.item.chapter_name} - {getDataChapter.data.item.comic_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{getDataChapter.data.item.chapter_image && getDataChapter.data.item.chapter_image.length>0 ? 
                    getDataChapter.data.item.chapter_image.map((chapter_image,index)=>
                        <Card.Img style={{margin:0}} variant='top' src={`${getDataChapter.data.domain_cdn}/${getDataChapter.data.item.chapter_path}/${chapter_image.image_file}`}></Card.Img>
                    ):"No Image Loading..."}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
        
      </Container>
    </div>
  )
}
