import React, { useState } from "react";
import styled from "styled-components";
import { Logo, FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";

const Profile = () => {
  const { user, updateUser, displayAlert, showAlert, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  function HandleSubmit(e) {
    e.preventDefault();
    const newUser = {
      ...user,
      name: name,
      lastName: lastName,
      location: location,
    };

    if (
      newUser.name == "" ||
      newUser.lastName == "" ||
      newUser.location == ""
    ) {
      displayAlert();
      return;
    }
    updateUser(newUser);
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={HandleSubmit}>
        <h2>Profile Information</h2>
        {showAlert ? <Alert /> : null}
        <FormRow
          type="text"
          name={name}
          value={name}
          labelText="Name"
          onSubmit={HandleSubmit}
          handleChange={(e) => {
            setName(e.target.value);
          }}
        />
        <FormRow
          type="text"
          name="lastName"
          value={lastName}
          labelText="Last Name"
          onSubmit={HandleSubmit}
          handleChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <FormRow
          type="text"
          name="location"
          value={location}
          labelText="Location"
          onSubmit={HandleSubmit}
          handleChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <button className="btn" type="submit" disabled={isLoading}>
          Save Changes
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form {
    text-align: center;
  }
`;

export default Profile;
