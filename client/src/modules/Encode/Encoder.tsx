import React, { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { UserContext } from "../../shared/UserContext/AuthContext";

const Encoder = () => {
  const [query, setQuery] = useState<string>("");
  const {
    state: {
      user,
      token: { token },
    },
    handleLogutUser,
  } = useContext(UserContext);
  const [data, setData] = useState<string>("");
  const [error, setError] = useState<string>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const tokenReq = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ query: query }),
      };
      const fetchToken = await fetch(
        "http://localhost:5000/encoder/token",
        tokenReq
      );
      const data = await fetchToken.json();
      if (fetchToken.status === 200) {
        setData(data);
      } else {
        setError(data);
      }
    } catch (err: any) {
      console.log(err);
      setError(err);
    }
  };

  return (
    <>
      <div className="w-full flex justify-end pr-10 pt-4">
        <Tooltip className="block" content="Logout" placement="bottom">
          <Button
            onClick={() => handleLogutUser()}
            variant="gradient"
            color="red"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="2em"
              width="2em"
            >
              <path d="M705.6 124.9a8 8 0 00-11.6 7.2v64.2c0 5.5 2.9 10.6 7.5 13.6a352.2 352.2 0 0162.2 49.8c32.7 32.8 58.4 70.9 76.3 113.3a355 355 0 0127.9 138.7c0 48.1-9.4 94.8-27.9 138.7a355.92 355.92 0 01-76.3 113.3 353.06 353.06 0 01-113.2 76.4c-43.8 18.6-90.5 28-138.5 28s-94.7-9.4-138.5-28a353.06 353.06 0 01-113.2-76.4A355.92 355.92 0 01184 650.4a355 355 0 01-27.9-138.7c0-48.1 9.4-94.8 27.9-138.7 17.9-42.4 43.6-80.5 76.3-113.3 19-19 39.8-35.6 62.2-49.8 4.7-2.9 7.5-8.1 7.5-13.6V132c0-6-6.3-9.8-11.6-7.2C178.5 195.2 82 339.3 80 506.3 77.2 745.1 272.5 943.5 511.2 944c239 .5 432.8-193.3 432.8-432.4 0-169.2-97-315.7-238.4-386.7zM480 560h64c4.4 0 8-3.6 8-8V88c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8z" />
            </svg>
          </Button>
        </Tooltip>
      </div>
      <div className="grid h-screen justify-items-center items-center">
        <Card className="w-96 ">
          <Typography
            variant="paragraph"
            color="black"
            className="text-center pt-4"
          >
            <span className="font-bold text-md">Hello</span> {user.email} ✔
          </Typography>
          {data ? (
            <Typography className="w-full text-center mb-10" color="green">
              You are authorized
            </Typography>
          ) : (
            <Typography
              variant="h6"
              color="orange"
              className="mb-10 text-center"
            >
              {error} {error ? <span>🚫</span> : ""}
            </Typography>
          )}
          <CardHeader
            variant="gradient"
            color="orange"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Encoder Form
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={onSubmit}>
              <Input
                color="orange"
                id="query"
                name="query"
                type="string"
                label="Send encoded string"
                size="lg"
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
              />
              <div className="mt-4"></div>
              <Button
                type="submit"
                variant="gradient"
                color="orange"
                fullWidth
                disabled={!query}
              >
                Send token
              </Button>
            </form>
          </CardBody>
          {data && (
            <Typography
              variant="small"
              color="black"
              className="mb-10 text-center"
            >
              Here is your encoded value: {data}
            </Typography>
          )}
        </Card>
      </div>
    </>
  );
};

export default Encoder;
