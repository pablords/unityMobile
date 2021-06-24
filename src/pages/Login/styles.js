import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #708090;

`;

const Logo = styled.Image`
  height: 30%;

  margin-bottom:60px;
`;

const Input = styled.TextInput`
  padding: 15px 20px;
  border-radius: 5px;
  background-color: #FFF;
  align-self: stretch;
  margin-bottom: 15px;
  margin: 10px 20px;
  font-size: 16px;
`;

const ErrorMessage = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 16px;
  margin-bottom: 15px;
  margin: 0px 20px;
`;

const Button = styled.TouchableHighlight`
  padding: 20px;
  border-radius: 5px;
  background-color: #00BFFF;
  align-self: stretch;
  margin: 10px 20px;
`;

const ButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

const SignUpLink = styled.TouchableHighlight`
  padding: 10px;
  margin-top: 20px;
`;

const SignUpLinkText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

const LogoText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  margin-top:-70px;
  margin-bottom:20px;
`;

export { Container, Logo, Input, ErrorMessage, Button, ButtonText, SignUpLink, SignUpLinkText, LogoText };