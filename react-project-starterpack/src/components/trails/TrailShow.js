import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Collapsible from 'react-collapsible'
import Auth from './../../lib/Auth'

class TrailCard extends React.Component{
state = { trail: null }

async componentDidMount() {
  const trailId = this.props.match.params.id
  try {
    const res = await axios.get(`/api/trails/${trailId}`)
    this.setState({ trail: res.data })
  } catch (err) {
    console.log(err)
  }
}


handleDelete = async () => {
  const trailId = this.props.match.params.id
  try {
    await axios.delete(`/api/trails/${trailId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}
    ` }
    })
    this.props.history.push('/trails')
  } catch (err) {
    console.log(err.response)
  }
} 

isOwner = () => {
  console.log('make trail', Auth.getPayLoad().sub)
  console.log('current user', this.state.trail.user._id)
  return Auth.getPayLoad().sub === this.state.trail.user._id
}

render() {
  const { trail } = this.state
  if (!trail) return null
  return (
    <section className="section">
      <div className="SHOWPAGE">
        <h2 className="title is-3 has-text-left">{trail.name} 🔎</h2>
        <h4 className="title is-4 has-text-left">{trail.directions}</h4>
        <hr/>
        <div className="columns">
          <div className="column is-half">
            <figure className="image">
              <img src={trail.image} alt={trail.name} id="ShowImage"/>
            </figure>
            <br/>
            <Link to={'#'}><button className=" button is-success">Edit Trail</button></Link>
            <Link to={'#'}><button className="button is-danger">Delete Trail</button></Link>
          </div>
          <div className="container">
            <h3 className="title is-3">Trail Clues</h3>
            <hr/>
            <Collapsible trigger = 'ClueOne +'className="dropDown">
              <p>{trail.clueOne}</p>
            </Collapsible>
            <hr/>
            <Collapsible trigger='Clue Two +'className="dropDown">
              <p>2.{trail.clueTwo}</p>
            </Collapsible>
            <hr/>
            <Collapsible trigger='Clue Three +'className="dropDown">
              <p>3.{trail.clueThree}</p>
            </Collapsible>
            <hr/>
            <h4>{trail.weatherFactor}</h4>
            <div className="Mapbox">
              <h4 className="title is-3">Map Locations</h4>
              <br/>
              <img src='https://c7.uihere.com/icons/305/955/619/gps-location-map-mobile-phone-pointer-smartphone-icon-3443604f1c2335175832ded904a4f6b7.png'/>
            </div>
            <hr/>
            <br />
            {this.isOwner() && 
                <>
                  <Link to={`/trails/${trail._id}/edit`} className="button is-warning">Edit Trail</Link>
                  <hr />
                  <button onClick={this.handleDelete} className="button is-danger">Delete Trail</button>
                </>
            }
          </div>
        </div>
      </div>
    </section>
  )
}
}

export default TrailCard