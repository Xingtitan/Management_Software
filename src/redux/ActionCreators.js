import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "./baseUrl";

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            `Error${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((response) => dispatch(updateStaffs(response)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const postStaff =
  (
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
  (dispatch) => {
    const newStaff = {
      id: id,
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: departmentId,
      annualLeave: annualLeave,
      overTime: overTime,
      image: image,
    };

    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          }
          if (response) {
            var error = new Error(`${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(fetchStaffs()))
      .catch((error) => {
        console.log("Post Staff", error.message);
        alert(`Your staff cant be posted\nError: ${error.message}`);
      });
  };

export const editStaff = (staffEdit) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "PATCH",
    body: JSON.stringify(staffEdit),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(`${response.status}: ${response.statusText}`);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(updateStaffs(response)))
    .catch((error) => {
      console.log("Edit Staff", error.message);
      alert(`Your staff cant be edit Error:${error.message}`);
    });
};

export const deleteStaff = (id) => dispatch => {
    return fetch(baseUrl + `staffs/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error(`Error${response.status} `);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => {
            console.log(response);
            var json = response.json();
            console.log(json);
            return json;
        })
        .then(response => dispatch(updateStaffs(response)))
        .catch(error => {
            console.log(error.message)
            alert(error.message)
        })
}

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errMess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errMess,
});

export const updateStaffs = (staffs) => ({
  type: ActionTypes.UPDATE_STAFFS,
  payload: staffs,
});

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errMess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errMess,
});

export const addDepartments = (depart) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: depart,
});
export const fetchDepartments = (id) => (dispatch) => {
  dispatch(departmentsLoading(true));

  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            `Error${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((depart) => dispatch(addDepartments(depart)))
    .catch((error) => dispatch(departmentsFailed(error.message)));
};

export const fetchSalary = () => (dispatch) => {
  dispatch(salaryLoading(true));

  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            `Error${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((salary) => dispatch(addSalary(salary)))
    .catch((error) => dispatch(salaryFailed(error.message)));
};

export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});

export const salaryFailed = (errMess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errMess,
});

export const addSalary = (salary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary,
});
