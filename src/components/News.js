import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`
  }


  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`
    { this.setState({ loading: true }) }
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
    console.log(parsedData)
    console.log(url)
    // fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7`)
    // .then(response => response.json())
    // .then(data1 => {
    //   console.log(data1)
    // })
  }

  async componentDidMount() {
    this.updateNews()
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({page: this.state.page + 1})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  // handlePrevious = async () => {
  //   this.setState({
  //     page: this.state.page - 1
  //   })
  //   this.updateNews();
  // }
  // handleNext = async () => {
  //   this.setState({
  //     page: this.state.page + 1
  //   })
  //   this.updateNews();
  // }

  render() {
    return (
      <>
        <h4 className='mt-5 py-5 text-center'>NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h4>
        
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className='row'>
              {this.state.articles.map((element) => {
                return <div className='col-md-4 my-2' key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between mt-4">
            <button disabled={this.state.page <= 1} type="button" className='btn btn-dark' onClick={this.handlePrevious}>&larr; Previous</button>
            <p>Page {this.state.page} of {Math.ceil(this.state.totalResults / this.props.pageSize)}</p>
            <button disabled={this.state.page > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNext}>&rarr; Next</button>
          </div> */}
      </>
    )
  }
}
export default News