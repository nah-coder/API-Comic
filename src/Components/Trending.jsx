import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Menu } from './Include/Menu';

export const Trending = () => {
    const {slug} = useParams(); 
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const items = data?.data?.data?.items;
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get(`https://otruyenapi.com/v1/api/danh-sach/${slug}`);
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
  return (
    <div>
      <Helmet>
        <title>{data.data.data.seoOnPage.titleHead}</title>
      </Helmet>
      <Container>
        <Menu />
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
          {items && items.length > 0 ? (items.map((item,index)=>(
            <Col>
            <Card>
            <Card.Img variant='top' src={`https://otruyenapi.com/uploads/comics/${item.thumb_url}`} />
              <Card.Body>
                <Card.Title>{item.name || "No Item"}</Card.Title>
                <Card.Text>{item.UpdateAt || "No Item"}</Card.Text>
                <Card.Text>
                  {items.Category && items.Category.length > 0 ? (items.Category.map((Category,index)=>(
                    <Badge bg='info' key={index}>
                      {Category.name}
                    </Badge>
                  ))):(
                    "Orther"
                  )}
                  
                </Card.Text>
                <Button variant='primary btn-sm' as={Link} to={`/comics/${item.slug}`}>More Detail</Button>
              </Card.Body>
            </Card>
          </Col>
          ))):(
            <Col>
              <Card.Body>No Content</Card.Body>
            </Col>
          )}
          
        </Row>
      </Container>
    </div>
  )
}
