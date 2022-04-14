import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { Loading } from "./LoadingComponent";


function RenderDepartmentCard({ department }) {
  return (
    <Card className={"my-3"}>
      <CardBody>
        <CardTitle>
          <h5>{department.name}</h5>
        </CardTitle>
        <CardSubtitle>
          <h6> Số lượng nhân viên: {department.numberOfStaff}</h6>
        </CardSubtitle>
      </CardBody>
    </Card>
  );
}

const DepartmentList = (props) => {
  const departmentList = props.departments.map((department) => {
    return (
      <div key={department.id} className="col-12 col-md-6 col-lg-4">
        <RenderDepartmentCard department={department} />
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
            <h4 className="ml-3 mb-0">Phòng ban</h4>
          </div>
          <div className="row">{departmentList}</div>
        </div>
      </div>
    );
};

export default DepartmentList;
