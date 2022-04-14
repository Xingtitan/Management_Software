import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { editStaff, deleteStaff } from "../redux/ActionCreators";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

const mapDispatchToProps = (dispatch) => ({
  editStaff: (staffEdit) => {
    dispatch(editStaff(staffEdit));
  },
  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
});

const ModalEditForm = ({ isOpen, setOpen, editStaff, staff }) => {
  staff.doB = dateFormat(staff.doB, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
  staff.startDate = dateFormat(staff.startDate, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
  const handleSubmit = (value) => {
    setOpen(!isOpen);
    const doB = new Date(value.doB);
    const startDate = new Date(value.startDate);

    const staffEdit = {
      id: staff.id,
      name: value.name,
      doB: doB,
      salaryScale: value.salaryScale,
      startDate: startDate,
      departmentId: value.departmentId,
      annualLeave: value.annualLeave,
      overTime: value.overTime,
    };
    editStaff(staffEdit);
  };

  return (
    <Modal isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
      <ModalHeader toggle={() => setOpen(!isOpen)}>
        Chỉnh sửa thông tin
      </ModalHeader>
      <ModalBody>
        <LocalForm
          initialState={staff}
          onSubmit={(value) => handleSubmit(value)}
        >
          <Row className="form-group">
            <Label htmlFor="name" md={5}>
              Tên
            </Label>
            <Col md={7}>
              <Control.text
                model=".name"
                className="form-control"
                // value={staff.name}
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
                // value={staff.doB}
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
                // value={staff.startDate}
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
                // value={staff.departmentId}
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
                // value={staff.salaryScale}
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
                // value={staff.annualLeave}
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
                // value={staff.overTime}
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
            Chỉnh sửa
          </Button>
        </LocalForm>
      </ModalBody>
    </Modal>
  );
};

function RenderStaffInfo({ staff, departmentName, editStaff, deleteStaff }) {
  const [isOpen, setOpen] = useState(false);

  const onDeleteStaff = () => {
    deleteStaff(staff.id);
  };

  return (
    <div className="container">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Stagger in>
          <Fade in>
            <div className="row">
              <div className="col-12 col-md-4">
                <img src={staff.image} alt={staff.name} width="100%" />
              </div>
              <div key={staff.id} className="col-12 mt-4">
                <h5>Họ và tên: {staff.name}</h5>
                <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")} </p>
                <p>
                  Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                </p>
                <p>Phòng ban: {departmentName.name} </p>
                <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                <p>Hệ số lương: {staff.salaryScale}</p>
                <p>Số ngày đã làm thêm: {staff.overTime}</p>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12 col-md-4">
                <div className="d-flex align-items-center justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => setOpen(!isOpen)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteStaff()}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
            <ModalEditForm
              isOpen={isOpen}
              setOpen={setOpen}
              staff={staff}
              editStaff={editStaff}
            />
          </Fade>
        </Stagger>
      </FadeTransform>
    </div>
  );
}

const StaffDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.staff.name != null) {
    return (
      <div className="mainContent">
        <div className="container">
          <div className="row mt-3 ml-0">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Nhân viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">
            <RenderStaffInfo
              staff={props.staff}
              editStaff={props.editStaff}
              deleteStaff={props.deleteStaff}
              departmentName={props.departmentName}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="mainContent">Không tìm thấy nhân viên</div>;
  }
};

export default connect(null, mapDispatchToProps)(StaffDetail);
