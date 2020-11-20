import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import Columns from 'react-columns';
import Form from 'react-bootstrap/Form'
function App() {
  const[latest,setLatest]= useState([]);
  const[result,setResult] = useState([]);
  const[search,setSearch]=useState("")
   useEffect(()=>{
    axios
    .all([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries?sort=country")
    ])
    .then(responseArr=>{
      setLatest(responseArr[0].data)
      setResult(responseArr[1].data)
      console.log(responseArr[1].data)
    })
    .catch(err=>{
    console.log(err)
    })
   },[]);

   const date = new Date(parseInt(latest.updated))
   const lastUpdated= date.toString();
   const filterCountries= result.filter(item=>{
     return search!== ""? item.country.includes(search):item;
   })
   const countries = filterCountries.map((data,i) =>{
     return(
       <Card
        key = {i}
        bg="light"
        text="dark"
        className="text-center"
        style={{margin:"10px"}}
       >
         <Card.Img variant="top" src={data.countryInfo.flag} />
       <Card.Body>
     <Card.Title>{data.country}</Card.Title>
     <Card.Text>Cases{data.cases}</Card.Text>
     <Card.Text>Deaths{data.deaths}</Card.Text>
     <Card.Text>Recovered{data.recovered}</Card.Text>
     <Card.Text>Today's cases{data.todayCases}</Card.Text>
     <Card.Text>Today's deaths{data.todayDeaths}</Card.Text>
     <Card.Text>Active{data.active}</Card.Text>
     
       </Card.Body>
       </Card>
     )
   });
   var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];
  return (
    <div >
      <br/>
      <h2 style={{textAlign:"center"}}>Covid-19 Live Stats</h2>
      <br/>
     <CardDeck>
  <Card bg="info" text={"white"}  className="text-center"  style={{margin:"10px"}}>
    
    <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>
       {latest.cases}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated} ago</small>
    </Card.Footer>
  </Card>
  <Card  bg="danger"
   text={"white"}
     className="text-center"
     style={{margin:"10px"}}
  >
    
    <Card.Body>
      <Card.Title>Deaths</Card.Title>
      <Card.Text>
      {latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated} ago</small>
    </Card.Footer>
  </Card>
  <Card bg="warning" text={"white"}  className="text-center"  style={{margin:"10px"}}>
    
    <Card.Body>
      <Card.Title>Recovered</Card.Title>
      <Card.Text>
        {latest.recovered}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated} ago</small>
    </Card.Footer>
  </Card>
</CardDeck>
<br />
<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Control type="text" placeholder="Search through country"
      onChange={e=>setSearch(e.target.value)}
    />
  </Form.Group>
</Form>
<Columns queries={queries}>{countries}</Columns>

    </div>
  );
}

export default App;
