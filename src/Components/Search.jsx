import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Menu } from './Include/Menu';

export const Search = () => {
    const [searchParam] = useSearchParams();
    const query = searchParam.get("query");
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error,setError] = useState(null);
  const items = data?.data?.items;
  const itemsPerPage = 24;
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${query}&page=${currentPage}`);
        setData(response.data);
        setLoading(false);
        console.log(response);
      }catch(error){
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  },[query,currentPage]);
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  const totalItems = data?.data?.param?.pagination?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate=(pageNumber)=>{
    setCurrentPage(pageNumber)
  }
  return (
    <div>
      <Helmet>
        <title>{data.data.seoOnPage.titleHead}</title>
      </Helmet>
      <Container>
        <Menu />
        <Pagination className='pagination-container'>
          <Pagination.Prev onClick={()=>currentPage>1 && paginate(currentPage-1)} disabled={currentPage===1} />
            {[...Array(totalPages)].map((_,index)=>{
              const pageNumber = index + 1;
              const rangeStart = Math.floor((currentPage-1)/5)*5+1;
              const rangeEnd = Math.min(rangeStart+4, totalPages);
              if(pageNumber >= rangeStart && pageNumber <= rangeEnd){
                return(
                  <Pagination.Item key={pageNumber} active={pageNumber===currentPage} onClick={()=> paginate(pageNumber)}>{pageNumber}</Pagination.Item>
                );
              }
              return null;
            })}
          <Pagination.Next onClick={()=>currentPage<totalPages && paginate(currentPage+1)} disabled={currentPage==totalPages} />
        </Pagination>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  keyword Search : {query}
                </Card.Title>
                {data.data.seoOnPage.descriptionHead}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {items && items.length > 0 ? (items.map((item,index)=>(
            <Col key={item.id || item.slug || index} xs={6} md={3} className="mb-4">
            <Card>
            <Card.Img variant='top' src={`https://otruyenapi.com/uploads/comics/${item.thumb_url}`} />
              <Card.Body>
                <Card.Title>{item.name || "No Item"}</Card.Title>
                <Card.Text>{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "No Item"}</Card.Text>
                <Card.Text>
                  {item.category && item.category.length > 0 ? (item.category.map((Category,index)=>(
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
