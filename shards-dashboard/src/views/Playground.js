import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect,
  Button,
  Progress
} from "shards-react";

import fs from 'fs';

import axios from 'axios';
import unirest from 'unirest';
import PageTitle from "../components/common/PageTitle";

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: "Browse the File",
      file: 'Browse the File',
      value: 0
    }
    this.myRef = React.createRef();

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event) => {
    console.log(event.target.files[0])
    this.setState({
      url: event.target.files[0].name,
      file: event.target.files[0]
    })
  }

  uploadData = () => {
    const data = new FormData();
    data.append('file', this.state.file)

    this.setState({
      value: 30
    })

    setTimeout(() => this.setState({ value: 50 }), 1500)
    axios.post('http://54.180.116.83:5000/api/audios', data)
      .then(res => {this.setState({ value: 100 }); alert("Success")})
      .catch((e) => { alert(e); this.setState({ value: 0 }) })
  }

  render() {
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Upload your Audio file"
              subtitle="DASHBOARD"
              className="text-sm-left"
            />
          </Row>
          <Row>
            <Col className="mb-4">
              {/* Sliders & Progress Bars */}
              <Card small>
                {/* Files & Dropdowns */}
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Upload</h6>
                </CardHeader>

                <ListGroup flush>
                  <ListGroupItem className="px-3">
                    <strong className="text-muted d-block mb-2">
                      Custom File Upload
                    </strong>
                    {/* files upload form */}
                    <div className="custom-file mb-3">
                      <input type="file" accept="audio/*" ref={this.myRef} onChange={this.handleChange} className="custom-file-input" id="customFile2" />
                      <label className="custom-file-label" htmlFor="customFile2" onClick={(e) => this.upload.click()}>
                        {this.state.url}
                      </label>
                    </div>
                    <strong className="text-muted d-block mb-2">
                      Custom Select
                    </strong>
                    <div>
                      <InputGroup className="mb-3">
                        <InputGroupAddon type="prepend">
                          <InputGroupText>Language</InputGroupText>
                        </InputGroupAddon>
                        <FormSelect>
                          <option>en</option>
                          <option>ko-KR</option>
                        </FormSelect>
                      </InputGroup>
                    </div>
                    <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={(e) => {
                      this.uploadData()
                    }}>
                      Submit
                    </Button>
                    <Progress style={{ height: "5px" }} value={this.state.value} className="mb-3" />
                  </ListGroupItem>
                </ListGroup>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Playground;
