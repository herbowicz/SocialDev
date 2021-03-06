import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useUser from '../../hooks/useUser';
import EmojiIcon from '../../assets/emoji.svg';
import EmojiPicker from '../atoms/EmojiPicker/EmojiPicker';

const StyledWrapper = styled.div`
  width: 45rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #e6ecf1;
  padding: 1rem 6rem;
  position: relative;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  position: relative;
`;

const StyledForm = styled.form`
  height: 8rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledTextArea = styled.textarea`
  width: 37rem;
  height: 100%;
  max-height: 16rem;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.regular};
  margin-top: 2rem;
  padding: 20px 20px 0 20px;
  resize: none;
  border: none;

  ::placeholder {
    color: #bec3c9;
    font-size: 1.2rem;
  }
`;

const StyledAuthorImage = styled.figure`
  display: flex;
  height: 100%;
  width: 6rem;
  position: absolute;
  top: 2.5rem;
  left: -10%;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100px;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 8rem 0 0;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (min-width: 650px) {
    padding: 0.5rem 1rem 0 0;
  }
`;

const StyledButton = styled.button`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.regular};
  color: #fff;
  background-color: hsla(203, 89%, 53%, 0.8);
  border-radius: 30px;
  padding: 0.4rem 3rem;

  :focus {
    color: hsla(203, 89%, 53%, 0.8);
    background: none;
    border: 2px solid hsla(203, 89%, 53%, 0.8);
  }
`;

const StyledEmojiButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60% 60%;
  position: absolute;
  right: 5%;
  top: 75%;
  cursor: pointer;
  border-radius: 30px;
  padding: 5px;

  :focus {
    border: 2px solid hsla(203, 89%, 53%, 0.6);
  }
`;

const PostToAdd = ({ handleCreate }) => {
  const [title, setTitle] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [pickerVisability, setPickerVisability] = useState(false);

  useUser(setCurrentUser);

  const handleContentChange = ({ target: { value } }) => setTitle(value);

  const handleSubmit = e => {
    e.preventDefault();
    const { uid, photoURL, email, userName } = currentUser.authUser;
    const post = {
      title,
      user: {
        name: userName,
        uid,
        email,
        photoURL,
      },
      likes: 0,
      comments: 0,
      createdAt: new Date(),
    };
    handleCreate(post);
    setTitle('');
  };

  const handleAddEmoji = ({ native }) => {
    setTitle(prevState => prevState + native);
  };

  const handlePickerVisability = () => {
    setPickerVisability(prevState => !prevState);
  };
  return (
    <>
      <StyledWrapper>
        {pickerVisability ? (
          <EmojiPicker handleAddEmoji={handleAddEmoji} top="40%" right="-50%" tabIndex="0" />
        ) : null}
        <StyledContainer>
          <StyledAuthorImage>
            <img
              src={currentUser ? currentUser.authUser.photoURL : null}
              alt={currentUser ? currentUser.authUser.userName : null}
            />
          </StyledAuthorImage>
          <StyledForm onSubmit={handleSubmit}>
            <StyledTextArea
              value={title}
              placeholder={`What's on your mind, ${
                currentUser ? currentUser.authUser.userName : null
              }?`}
              name="title"
              onChange={handleContentChange}
              aria-label={`What's on your mind, ${
                currentUser ? currentUser.authUser.userName : null
              }?`}
              isRequired
            />
          </StyledForm>
        </StyledContainer>
        <StyledButtonWrapper>
          <StyledButton type="submit" onClick={handleSubmit}>
            Post
          </StyledButton>
          <StyledEmojiButton onClick={handlePickerVisability} icon={EmojiIcon} />
        </StyledButtonWrapper>
      </StyledWrapper>
    </>
  );
};

PostToAdd.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};

export default PostToAdd;
