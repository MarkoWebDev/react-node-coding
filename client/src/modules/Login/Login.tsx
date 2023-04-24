import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../shared/UserContext/AuthContext";

interface initialStateProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, handleToken } = useContext(UserContext);

  //initialValues
  const initialValues: initialStateProps = {
    email: "",
    password: "",
  };

  //assigning values to input state
  const [values, setValues] = useState<initialStateProps>(initialValues);

  //assigning values to erorr state
  const [error, setError] = useState<initialStateProps | any>({});

  //validation flag
  const [isValid, setIsValid] = useState<boolean>();

  //handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev: initialStateProps) => ({ ...prev, [name]: value }));
  };

  /**
   * validate email and password input fields
   * @param {string} values
   */
  const validate = (values: initialStateProps) => {
    const emailValidate =
      /^([a-z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(
        values.email
      );
    const validatePassword = /^(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(
      values.password
    );
    if (values.email === "") {
      setError((prev: any) => ({ ...prev, email: "Required" }));
    } else {
      setError({});
    }
    if (values.password === "") {
      setError((prev: any) => ({ ...prev, password: "Required" }));
    } else if (!emailValidate) {
      setError((prev: any) => ({ ...prev, email: "Invalid email address" }));
    } else if (!validatePassword) {
      setError((prev: any) => ({ ...prev, password: "Invalid password" }));
    } else {
      setError({});
    }
    return error;
  };

  useEffect(() => {
    validate(values);
  }, [values]);

  //submiting form
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      /**
       * send email and password to AuthContext api
       * @param {string} values.email
       * @param {string} values.password
       */
      try {
        const auth = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        };
        const fetchResponse = await fetch("http://localhost:5000/login", auth);
        const data = await fetchResponse.json();
        if (fetchResponse.status === 200) {
          setIsValid(true);
          loginUser(values.email, values.password);
          handleToken(data);
          navigate("/encoder");
          setValues({ email: "", password: "" });
        } else {
          setIsValid(false);
          setError((prev: any) => ({
            ...prev,
            authError: data,
          }));
        }
      } catch (err: any) {
        setIsValid(false);
        setError((prev: any) => ({
          ...prev,
          authError: err.message,
        }));
        console.log(err);
      }
    }
  };
  return (
    <div className="grid h-screen justify-items-center items-center ">
      <Card className="w-96 ">
        {isValid ? (
          <Alert className="w-96 mb-10" color="green">
            Action completed successfully!!!
          </Alert>
        ) : (
          isValid === false &&
          error?.authError && (
            <Alert className="w-96 mb-10" color="amber">
              {error?.authError}
            </Alert>
          )
        )}
        <CardHeader
          variant="gradient"
          color="teal"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Login
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form onSubmit={onSubmit}>
            <Input
              color="teal"
              id="email"
              name="email"
              type="email"
              label="Email"
              size="lg"
              value={values.email.toLowerCase()}
              onChange={handleChange}
            />
            <div className="my-2 flex"></div>
            {error?.email && (
              <Typography
                variant="small"
                className="my-2 flex text-red-400 justify-center"
              >
                {error?.email}
              </Typography>
            )}
            <Input
              color="teal"
              id="password"
              name="password"
              type="password"
              label="Password"
              size="lg"
              value={values.password}
              onChange={handleChange}
            />

            {error?.password && (
              <Typography
                variant="small"
                className="my-2 flex text-red-400 justify-center"
              >
                {error?.password}
              </Typography>
            )}
            <div className="my-2 flex"></div>
            <Button
              type="submit"
              variant="gradient"
              color="teal"
              fullWidth
              disabled={values.email === "" || values.password === ""}
            >
              Login
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Login into your account!
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
