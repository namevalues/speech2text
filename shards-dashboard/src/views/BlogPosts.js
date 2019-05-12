/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import { Link } from 'react-router-dom';

import axios from 'axios';

import PageTitle from "../components/common/PageTitle";

class BlogPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // First list of posts.
      PostsListOne: [

      ]
    };
  }

  componentDidMount() {
    axios.get('http://54.180.116.83:5000/api/audios').then(res => {
      for (var i = 0; i < res.data.audios.length; i++) {
        var temp = {
          backgroundImage: require("../images/content-management/10.jpeg"),
          author: res.data.audios[i].id,
          authorUrl: "#",
          category: "",
          categoryUrl: "#",
          title: res.data.audios[i].name,
          body:
            "For county now sister engage had season better had waited. Occasional mrs interested far expression directly as regard...",
          date: "29 February 2019",
          url: res.data.audios[i].url
        }
        this.setState({
          PostsListOne: Array.from(this.state.PostsListOne).concat(temp)
        })
      }
    })
  }

  render() {
    const {
      PostsListOne
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}

        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="File List" subtitle="DASHBOARD" className="text-sm-left" />
        </Row>

        {/* First Row of Posts */}
        <Row>
          {PostsListOne.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx+1}>
              <div onClick={()=>(<Link to='/play'></Link>)}>
                <Card small className="card-post card-post--1" >
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url(${require("../images/content-management/9.jpeg")})` }}
                  >
                    <Badge
                      pill
                      className={`card-post__category bg-${post.categoryTheme}`}
                    >
                      {post.category}
                    </Badge>
                    <div className="card-post__author d-flex">
                      <a
                        href={"/play?url="+post.url+'&index='+(Number(idx)+1)}
                        className="card-post__author-avatar card-post__author-avatar--small"
                        style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                      >
                        Written by {post.author}
                      </a>
                    </div>
                  </div>
                  <CardBody>
                    <h5 className="card-title">
                      <a href={"/play?url="+post.url+'&index='+(Number(idx)+1)} className="text-fiord-blue">
                        {post.title}
                      </a>
                    </h5>
                    <p className="card-text d-inline-block mb-3">{post.body}</p>
                    <span className="text-muted">{post.date}</span>
                  </CardBody>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default BlogPosts;
