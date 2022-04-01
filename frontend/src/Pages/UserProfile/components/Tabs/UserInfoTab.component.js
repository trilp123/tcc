import React, { useState } from "react";
import { Card } from "../../UserProfile.component.styled";
import { FormStyled } from "../../UserProfile.component.styled";
import { StyledButton } from "../../UserProfile.component.styled";
import * as UserProfileService from "../../services/UserProfile.service";
import PersonalInfo from "./sessions/PersonalInfo.component";
import SocialRegister from "./sessions/SocialsRegister.component";
import UserSkills from "./sessions/UserSkills.component";
import { Row, Notification } from "../../../../antd_components";

const UserInfoTab = ({ darkPallete, user, token, viewMode }) => {
  const [editMode, setEditMode] = useState(false);

  const styleInput = {
    color: "gray",
    marginTop: "-1px",
  };

  function handleSubmit(values) {
    const {
      username,
      email,
      cpf,
      phone,
      celphone,
      biography,
      facebook,
      instagram,
      twitter,
      linkedin,
      github,
    } = values;

    const dto = {
      username,
      email,
      cpf,
      phone: phone || null,
      celphone: celphone || null,
      biography: biography || null,
      socials: {
        facebook: facebook || null,
        instagram: instagram || null,
        twitter: twitter || null,
        linkedin: linkedin || null,
        github: github || null,
      },
    };

    UserProfileService.UpdateUserInfo(dto, token).then(({ data }) => {
      const { message, status } = data;

      Notification.open({
        type: status === 200 ? "success" : "error",
        message,
      });

      setEditMode(false);
    });
  }

  return (
    <Card bordered={false}>
      {user && (
        <FormStyled
          background={darkPallete.white}
          onFinish={handleSubmit}
          layout='vertical'
          initialValues={{
            username: user.username,
            email: user.email,
            cpf: user?.cpf,
            phone: user?.phone,
            celphone: user?.celphone,
            biography: user.biography,
            facebook: user?.socials?.facebook,
            instagram: user?.socials?.instagram,
            twitter: user?.socials?.twitter,
            linkedin: user?.socials?.linkedin,
            github: user?.socials?.github,
          }}
        >
          <PersonalInfo
            editMode={editMode}
            viewMode={viewMode}
            styleInput={styleInput}
            darkPallete={darkPallete}
            setEditMode={(value) => setEditMode(value)}
          />

          <UserSkills
            editMode={editMode}
            viewMode={viewMode}
            styleInput={styleInput}
            darkPallete={darkPallete}
          />

          <SocialRegister editMode={editMode} viewMode={viewMode} styleInput={styleInput} />

          {editMode && (
            <Row justify='end'>
              <StyledButton
                htmlType='submit'
                backgroundcolor={darkPallete.lightblue}
                height='35'
                width='200'
                color={darkPallete.white}
              >
                Confirmar
              </StyledButton>
            </Row>
          )}
        </FormStyled>
      )}
    </Card>
  );
};

export default UserInfoTab;
