import React from "react";
import { Container, Row, Col } from "shards-react";

import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  FormSelect
} from "shards-react";

import axios from 'axios';
import queryString from 'query-string';

import PageTitle from "../components/common/PageTitle";
import TopReferrals from "../components/common/TopReferrals";
import AudioPlayer from "react-h5-audio-player";

import SearchInput, { createFilter } from 'react-search-input'

const KEYS_TO_FILTERS = ['word']

class AudioView extends React.Component {

  intervalID = 0;

  constructor(props) {
    super(props);

    this.state = {
      // First list of posts.
      query: {

      },
      words: [

      ],
      keyword: [

      ],
      searchWord: '',
      curTime: 0
    };

    this.audioRef = React.createRef()
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  componentDidMount() {

    this.setState({
      query: queryString.parse(this.props.location.search)
    })

    const query = queryString.parse(this.props.location.search)

    axios.get('http://54.180.116.83:5000/api/audios/' + query.index).then(res => {
      for (var i = 0; i < res.data.words.length; i++) {
        var temp = {
          start_time: res.data.words[i].start_time,
          word: res.data.words[i].word,
          id: res.data.words[i].id,
          audio_id: res.data.words[i].audio_id,
          end_time: res.data.words[i].end_time,
        }
        this.setState({
          words: Array.from(this.state.words).concat(temp)
        })
      }
    })

    axios.get('http://54.180.116.83:5000/api/audios/' + query.index + '/keyword').then(res => {
      console.log(res);
      for (var i = 0; i < res.data.words.terms.length; i++) {
        var temp = {
          term: res.data.words.terms[i].term,
          score: res.data.words.terms[i].score,
        }
        this.setState({
          keyword: Array.from(this.state.keyword).concat(temp)
        })
      }
    })

    let temp = document.getElementsByTagName('audio');

    this.intervalID = setInterval(() => {
      this.setState({
        curTime: temp[0].currentTime
      })
    }, 1000)

  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  

  render() {
    const {
      words,
      curTime
    } = this.state;

    var isAlpha = function(ch){
      if(ch.includes(',') || ch.includes('.') || ch.includes('?')) {
        return false;
      }
      else
        return true;
    }

    const filteredWord = words.filter(createFilter(this.state.searchWord, KEYS_TO_FILTERS))

    /* bold 처리 */
    for (var i = 0; i < words.length; i++) {
      words[i].is_bold = false;
    }
    for (var i = 0; i < words.length; i++) {
      /* 기존 bold 처리했던건 모두 다시 롤백*/
      if (curTime <= words[i].end_time && curTime >= words[i].start_time) {
        words[i].is_bold = true;
      }
    }

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Add New Post" subtitle="Blog Posts" className="text-sm-left" />
        </Row>
        <Row>
          {/* Editor */}
          <Col lg="12" md="12" >
            <AudioPlayer src={this.state.query.url} onPlay={e => console.log("onPlay")} />
          </Col>
          <div style={{ height: '50px', width: '100%' }} />
          <Col lg="9" md="12">
            <Card small align="center">
              <CardHeader className="border-bottom">
                <h6 className="m-0">{}</h6>
                <div className="block-handle" />
              </CardHeader>

              <CardBody className="p-0">
                
                  <SearchInput className="form-control" onChange={this.searchUpdated} />
                  {filteredWord.map((item, idx) => isAlpha(item.word) ? (
                    <a className={"words-item"} key={idx} style={{ textAlign: 'center', marginBottom: '5px', fontWeight: item.is_bold ? 'bold' : '' }} onClick={() => {
                      let temp = document.getElementsByTagName('audio');
                      temp[0].currentTime = item.start_time;
                      temp[0].play();
                      this.setState({searchWord: ''})
                    }}>{item.word + " "}</a>

                  ) : (<a key={idx}><br/><br/></a>))}
           
              </CardBody>
            </Card>
          </Col>
          <div style={{ height: '50px' }} />
          <Col lg="3" md="12">
            <TopReferrals title={"Keyword"} referralData={this.state.keyword}></TopReferrals>
          </Col>
        </Row>
      </Container>
    )
  }

  searchUpdated(word) {
    this.setState({ searchWord: word })
  }
}

export default AudioView;
