import React from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { Loading } from "./LoadingComponent";


function Renderpayroll({ staff }) {
  const basicSalary = 3000000;
  const overTimeSalary = 200000;
  const salary = Math.round(
    staff.salaryScale * basicSalary + staff.overTime * overTimeSalary
  );

  return (
    <Card className={"my-3"}>
      <CardBody>
        <CardTitle>
          <h4>{staff.name}</h4>
        </CardTitle>
        <CardText>
          <h6>Mã nhân viên: {staff.id}</h6>
        </CardText>
        <CardText>
          <h6>Hệ số lương: {staff.salaryScale}</h6>
        </CardText>
        <CardText>
          <h6>Số giờ làm thêm: {staff.overTime}</h6>
        </CardText>
        <CardText>
          <h7>Lương: {salary}</h7>
        </CardText>
      </CardBody>
    </Card>
  );
}

const PayrollList = (props) => {
  const payrollList = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-12 col-md-6 col-lg-4">
        <Renderpayroll staff={staff} />
      </div>
    );
  });

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
  } else
    return (
      <div className="mainContent">
        <div className="container">
          <div className="row mt-2">
            <h4 className="ml-3 mb-0">Bảng lương</h4>
          </div>
          <div className="row">{payrollList}</div>
        </div>
      </div>
    );
};

export default PayrollList;
