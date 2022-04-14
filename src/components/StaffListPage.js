/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Button,
  Row,
  Col,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
} from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { Fade, Stagger, FadeTransform } from "react-animation-components";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

function RenderStaffCard({ staff }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <Stagger in>
        <Fade in>
          <Card className={"my-3"}>
            <Link to={`/staffs/${staff.id}`}>
              <CardImg src={staff.image} alt={staff.name} />
              <CardBody>
                <CardTitle>{staff.name}</CardTitle>
              </CardBody>
            </Link>
          </Card>
        </Fade>
      </Stagger>
    </FadeTransform>
  );
}

class NewEmployeeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleSubmit(value) {
    this.setState({ isModalOpen: !this.state.isModalOpen });
    this.props.postStaff(
      this.props.staffs.length,
      value.name,
      dateFormat(value.doB, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"),
      Number(value.salaryScale),
      dateFormat(value.startDate, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"),
      value.departmentId,
      Number(value.annualLeave),
      Number(value.overTime),
      "/asset/images/alberto.png"
    );
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggleModal}>
          <span className="fa fa-plus"></span> Add
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
              <Row className="form-group">
                <Label htmlFor="name" md={5}>
                  Tên
                </Label>
                <Col md={7}>
                  <Control.text
                    model=".name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập. ",
                      minLength: "Yêu cầu nhiều hơn 2 ký tự. ",
                      maxLength: "Yêu cầu ít hơn 30 ký tự.",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="doB" md={5}>
                  Ngày sinh
                </Label>
                <Col md={7}>
                  <Control.text
                    model=".doB"
                    type="date"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập. ",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="startDate" md={5}>
                  Ngày vào công ty
                </Label>
                <Col md={7}>
                  <Control.text
                    model=".startDate"
                    type="date"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập. ",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="departmentId" md={5}>
                  Phòng ban
                </Label>
                <Col md={7}>
                  <Control.select
                    model=".departmentId"
                    className="form-control"
                  >
                    <option />
                    <option value="Dept01">Sale</option>
                    <option value="Dept02">HR</option>
                    <option value="Dept03">Marketing</option>
                    <option value="Dept04">IT</option>
                    <option value="Dept05">Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="salaryScale" md={5}>
                  Hệ số lương
                </Label>
                <Col md={7}>
                  <Control
                    type="number"
                    model=".salaryScale"
                    className="form-control"
                    validators={{
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".salaryScale"
                    show="touched"
                    messages={{
                      isNumber: "Phải nhập vào một số.",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="annualLeave" md={5}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={7}>
                  <Control
                    type="number"
                    model=".annualLeave"
                    className="form-control"
                    validators={{
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".annualLeave"
                    show="touched"
                    messages={{
                      isNumber: "Phải nhập vào một số.",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="overTime" md={5}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={7}>
                  <Control
                    type="number"
                    model=".overTime"
                    className="form-control"
                    validators={{
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".overTime"
                    show="touched"
                    messages={{
                      isNumber: "Phải nhập vào một số.",
                    }}
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Thêm
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchBtn: "",
    };
    this.searchTerm = this.searchTerm.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
  }

  searchTerm(value) {
    this.setState({
      searchTerm: value,
    });
  }

  handleSearch() {
    this.setState({
      searchBtn: this.state.searchTerm,
    });

    this.setState({
      searchTerm: "",
    });
  }

  handleSearchTerm(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const staffList = this.props.staffs.staffs
      .filter((val) => {
        if (
          this.state.searchBtn === "" ||
          this.state.searchBtn === null ||
          this.state.searchBtn === undefined
        ) {
          return val;
        } else if (
          val.name
            .toLowerCase()
            .includes(this.state.searchBtn.toLocaleLowerCase())
        ) {
          return val;
        }
      })
      .map((staff) => {
        return (
          <div key={staff.id} className="col-6 col-md-4 col-lg-2">
            <RenderStaffCard staff={staff} onClick={this.props.onClick} />
          </div>
        );
      });

    if (this.props.staffs.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.staffs.errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>{this.props.staffs.errMess}</h4>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div className="mainContent">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 my-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="m-0">Nhân viên</h4>
                  <NewEmployeeForm
                    staffs={this.props.staffs}
                    postStaff={this.props.postStaff}
                    fetchStaffs={this.props.fetchStaffs}
                  />
                </div>
              </div>
              <div className="col-12 col-md-5 offset-md-1 my-md-3">
                <Form className="d-flex justify-content-between align-items-center">
                  <Input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Nhân viên cần tìm"
                    value={this.state.searchTerm}
                    onChange={(event) => this.handleSearchTerm(event)}
                  />
                  <Button className="ml-1" onClick={this.handleSearch}>
                    <span className="fa fa-search"></span> Tìm
                  </Button>
                </Form>
              </div>
            </div>

            <div className="row">{staffList}</div>
          </div>
        </div>
      );
  }
}

export default StaffList;
