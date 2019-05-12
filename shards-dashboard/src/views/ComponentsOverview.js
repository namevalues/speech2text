import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  Alert
} from "shards-react";

import queryString from 'query-string';

import { Link } from 'react-router-dom';

import PageTitle from "../components/common/PageTitle";
import Colors from "../components/components-overview/Colors";
import Checkboxes from "../components/components-overview/Checkboxes";
import RadioButtons from "../components/components-overview/RadioButtons";
import ToggleButtons from "../components/components-overview/ToggleButtons";
import SmallButtons from "../components/components-overview/SmallButtons";
import SmallOutlineButtons from "../components/components-overview/SmallOutlineButtons";
import NormalButtons from "../components/components-overview/NormalButtons";
import NormalOutlineButtons from "../components/components-overview/NormalOutlineButtons";
import Forms from "../components/components-overview/Forms";
import FormValidation from "../components/components-overview/FormValidation";
import CompleteFormExample from "../components/components-overview/CompleteFormExample";
import Sliders from "../components/components-overview/Sliders";
import ProgressBars from "../components/components-overview/ProgressBars";
import ButtonGroups from "../components/components-overview/ButtonGroups";
import InputGroups from "../components/components-overview/InputGroups";
import SeamlessInputGroups from "../components/components-overview/SeamlessInputGroups";
import CustomFileUpload from "../components/components-overview/CustomFileUpload";
import DropdownInputGroups from "../components/components-overview/DropdownInputGroups";
import CustomSelect from "../components/components-overview/CustomSelect";
import axios from "axios";

class ComponentsOverview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      result: [],
      target: ''
    };
  }

  componentDidMount() {
    let myData = [];
  }


  handleChange = event => {
    this.setState({ target: event.target.value });

    if (event.target.value) {
      axios.get(`http://54.180.116.83:5000/api/audios/search/${event.target.value}`)
        .then(res => {
          console.log(res);
          this.setState({
            result: res.data.result
          })
        })
    }
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  sortData = () => {
    const myData = [].concat(this.state.result)
      .sort((a, b) => a.word_count > b.word_count)
      .map((item, idx) =>
        <tr key={idx} onClick={() => <Link to={'/play?url=' + item.audio.url + '&index=' + item.audio.id} push />}>
          <td>{idx + 1}</td>
          <td><a href={'/play?url=' + item.audio.url + '&index=' + item.audio.id}>{item.audio.name}</a></td>
          <td>{item.word_count}</td>
        </tr>
      );
    return myData;
  }

  render() {
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Search Your Record by Text"
              subtitle="DASHBOARD"
              className="text-sm-left"
            />
          </Row>

          <Row>
            <Col lg="12" className="mb-4">
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Form Inputs</h6>
                </CardHeader>

                <ListGroup flush>
                  <ListGroupItem className="p-0 px-3 pt-3">
                    <form onSubmit={this.handleSubmit}>
                      <label>
                        Search !

                        <input className="form-control" name="search"
                          onChange={this.handleChange} />
                      </label>
                      &nbsp;
                      <button className={"btn btn-primary"} type="submit">Search</button>
                    </form>
                  </ListGroupItem>
                </ListGroup>

                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          #
                  </th>
                        <th scope="col" className="border-0">
                          File Name
                  </th>
                        <th scope="col" className="border-0">
                          Word Count
                  </th>
                      </tr>
                    </thead>
                    <tbody>
                      {

                        this.state.result.sort((a, b) => { return a.word_count - b.word_count }).reverse().map(
                          (item, idx) => <tr key={idx} onClick={() => <Link to={'/play?url=' + item.audio.url + '&index=' + item.audio.id} push />}>
                            <td>{idx + 1}</td>
                            <td><a href={'/play?url=' + item.audio.url + '&index=' + item.audio.id}>{item.audio.name}</a></td>
                            <td>{item.word_count}</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}


export default ComponentsOverview;
