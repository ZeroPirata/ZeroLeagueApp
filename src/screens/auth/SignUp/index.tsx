import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { Btn } from "../../../components/button";
import { Input } from "../../../components/input";
import themes from "../../../styles/themes";
import {
  Container,
  ContainerHeader,
  TextContainerHeader,
  DescriptionContainerHeader,
  DescriptionContainerHeaderSocial,
  ContainerBody,
  ContainerHeaderButton,
  TextError,
} from "./style";
import { db } from "../../../configs/firebase";
import { erroLogs } from "../../../utils/errors";

const SignUp: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordErroStyle, setPasswordErroStyle] = useState(false);
  const auth = getAuth();
  const [passwordMessageErro, setPasswordMessageErro] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: password,
  });
  async function handleRegister() {
    setPasswordErroStyle(false);
    setErrorMessage("");
    if (password !== confirmPassword) {
      setPasswordMessageErro("Passwords do not match");
      setPasswordErroStyle(true);
      return;
    }
    if (value.name === "" || value.email === "" || value.password === "") {
      setErrorMessage("All fields are mandatory.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      await addDoc(collection(db, "users"), {
        name: value.name,
        email: value.email,
      });
    } catch (error: any) {
      error = erroLogs(error.code);
      setErrorMessage(error);
    }
  }
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("SignIn");
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContainerHeader>
          <ContainerHeaderButton>
            <Btn
              variant="SmallIconButton"
              IconName="arrow-circle-o-left"
              IconColor="white"
              onPress={handleLogin}
            />
          </ContainerHeaderButton>
          <TextContainerHeader>Sign Up</TextContainerHeader>
          <DescriptionContainerHeader>
            it's quick and easy (⌐■_■)
          </DescriptionContainerHeader>
          <DescriptionContainerHeaderSocial>
            If you want, register with one of the social networks below
          </DescriptionContainerHeaderSocial>
        </ContainerHeader>
        <ContainerBody>
          {errorMessage ? <TextError>{errorMessage}</TextError> : null}
          <Input
            LeftIcon
            iconSize={20}
            placeholder={"Name"}
            value={value.name}
            onChangeText={(text) => setValue({ ...value, name: text })}
            iconName="person-outline"
            secureTextEntry={false}
            width={325}
          />
          <Input
            LeftIcon
            iconSize={20}
            placeholder={"Email"}
            iconName="mail-outline"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            secureTextEntry={false}
            width={325}
            marginTop={10}
          />
          <Input
            LeftIcon
            RightIcon
            iconSize={20}
            placeholder={"Password"}
            iconName="lock-closed-outline"
            value={password}
            style={{ borderColor: passwordErroStyle ? "red" : "default" }}
            onChangeText={(text) => {
              setPassword(text), setValue({ ...value, password: text });
            }}
            width={325}
            marginTop={10}
          />
          {passwordErroStyle ? (
            <TextError>{passwordMessageErro}</TextError>
          ) : null}
          <Input
            LeftIcon
            RightIcon
            iconSize={20}
            placeholder={"Repeat password"}
            iconName="lock-closed-outline"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            width={325}
            marginTop={10}
          />
          {passwordErroStyle ? (
            <TextError>{passwordMessageErro}</TextError>
          ) : null}
          <Btn
            IconColor={themes.COLORS.WHITE_100}
            title="Sign Up"
            style={{
              marginTop: 15,
            }}
            variant="SmallButtonGoldBorded"
            fontColor={themes.COLORS.WHITE_100}
            onPress={handleRegister}
          />
        </ContainerBody>
      </ScrollView>
    </Container>
  );
};
export { SignUp };
