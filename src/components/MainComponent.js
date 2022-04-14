import React, { Component } from "react";
import StaffList from "./StaffListPage";
import DepartmentList from "./DepartmentPage";
import PayrollList from "./PayrollPage";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffDetail from "./StaffDetailComponent";
import { Routes, Route, useParams } from "react-router-dom";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import {
  postStaff,
  fetchStaffs,
  fetchDepartments,
  fetchSalary,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salary: state.salary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postStaff: (
    id,
    name,
    doB,
    salaryScale,
    startDate,
    departmentId,
    annualLeave,
    overTime,
    image
  ) =>
    dispatch(
      postStaff(
        id,
        name,
        doB,
        salaryScale,
        startDate,
        departmentId,
        annualLeave,
        overTime,
        image
      )
    ),
  fetchStaffs: () => dispatch(fetchStaffs()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchSalary: () => dispatch(fetchSalary()),
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalary();
  }

  render() {
    const StaffWithId = () => {
      let params = useParams();
      const staff = this.props.staffs.staffs.find(
        (staff) => staff.id === Number(params.staffId)
      );
      let departmentName;
      if (staff) {
        departmentName = this.props.departments.departments.find(
          (depart) => depart.id === staff.departmentId
        );
      }
      if (departmentName) {
        return (
          <StaffDetail
            staff={staff}
            departmentName={departmentName}
            isLoading={this.props.staffs.isLoading}
            errMess={this.props.staffs.errMess}
          />
        );
      }
      return <div className="mainContent"></div>;
    };

    return (
      <div>
        <Header />
        {/* <TransitionGroup key={this.props.location.key} classNames="page" timeout={300}>
          <CSSTransition location={this.props.location}> */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <StaffList
                staffs={this.props.staffs}
                postStaff={this.props.postStaff}
              />
            }
          />
          <Route path="/staffs/:staffId" element={<StaffWithId />} />
          <Route
            path="/department"
            element={
              <DepartmentList
                departments={this.props.departments.departments}
                isLoading={this.props.departments.isLoading}
                errMess={this.props.departments.errMess}
              />
            }
          />
          <Route
            path="/payroll"
            element={
              <PayrollList
                staffs={this.props.salary.salary}
                isLoading={this.props.salary.isLoading}
                errMess={this.props.salary.errMess}
              />
            }
          />
        </Routes>
        {/* </CSSTransition>
        </TransitionGroup> */}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
