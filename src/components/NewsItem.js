import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="card" style={{ opacity: '60%' }}>
          <div className='d-flex position-absolute end-0'>
          <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
        <img src={imageUrl} className="card-img-top" alt="..." style={{ opacity: '20%' }} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className='text-muted text-success-emphasis'>By {author == null ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target='_blank' className="btn btn-dark btn-sm">Read more</a>
        </div>
      </div>
    )
  }
}

export default NewsItem