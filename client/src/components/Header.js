import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="">
        <div className="title">Major Image</div>
        <div className="navbar">
          <span className="navtab">
            <Link to="/" className="">
              Objects
            </Link>
          </span>
          <span className="navtab">
            <Link to="/scenery" className="">
              Scenery
            </Link>
          </span>
          <span className="navtab">
            <Link to="/npc" className="">
              NPC
            </Link>
          </span>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)