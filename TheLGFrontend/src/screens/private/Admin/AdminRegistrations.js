import React, { Component } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";

export default class AdminRegistrations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: [],
    };

    this.getRegistered = this.getRegistered.bind(this);
  }

  getRegistered(URL) {
    Axios.get(URL, {
      headers: {
        Authorization: `Token ${localStorage.getItem("userTokenLG")}`,
      },
    }).then((response) => {
      this.setState({
        children: response.data,
      });
    });
  }

  componentWillMount() {
    this.getRegistered("https://www.lebarongaleana-api.com/api/admin/YOI/");
  }

  render() {
    const headers = [
      { label: "ID", key: "id" },
      { label: "First Name", key: "first_name" },
      { label: "Last Name", key: "last_name" },
      { label: "Birthday", key: "birthdate" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone_number" },
      { label: "Allergies", key: "allergies" },
      { label: "Size", key: "size" },
      { label: "Parent", key: "parent.username" },
      { label: "Gender", key: "gender" },
      { label: "Spanish Shirt", key: "spanish_shirt" },
      { label: "Translation Assistance", key: "translation_assistance" },
    ];

    return (
      <div className={this.props.className}>
        <div className="adminTable">
          <div className="adminTableHeader">
            <div className="adminTableHeader-title">YOI Registration List</div>
            <CSVLink data={this.state.children} headers={headers}>
              <FontAwesomeIcon
                className="adminExcelExport"
                icon={faFileExcel}
              />
            </CSVLink>
          </div>
          <div className="adminTableBody">
            <table>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Birthday</th>
                <th>Email</th>
                <th>Phone</th>
                <th>allergies</th>
                <th>size</th>
                <th>Spanish Shirt</th>
                <th>Translation Assistance</th>
                <th>parent</th>
              </tr>
              <tbody>
                {this.state.children.map((child) => {
                  return (
                    <tr key={child.id}>
                      <td>{child.id}</td>
                      <td>{child.first_name}</td>
                      <td>{child.last_name}</td>
                      <td>
                        {child.gender === 0 ? "Male" : null}
                        {child.gender === 1 ? "Female" : null}
                        {child.gender === 2 ? "Unknown" : null}
                      </td>
                      <td>{child.birthdate}</td>
                      <td>{child.email}</td>
                      <td>{child.phone_number}</td>
                      <td>{child.allergies}</td>
                      <td>
                        {child.size === 0 ? "Extra Small" : null}
                        {child.size === 1 ? "Small" : null}
                        {child.size === 2 ? "Medium" : null}
                        {child.size === 3 ? "Large" : null}
                        {child.size === 4 ? "Extra Large" : null}
                        {child.size === 5 ? "12/14" : null}
                        {child.size === 6 ? "14/16" : null}
                        {child.size === 7 ? "Other" : null}

                      </td>
                      <td>{child.spanish_shirt ? "Yes" : "No"}</td>
                      <td>{child.translation_assistance ? "Yes" : "No"}</td>
                      <td>
                        {child.parent.first_name} {child.parent.last_name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="adminTableFooter"></div>
          </div>
        </div>
      </div>
    );
  }
}
