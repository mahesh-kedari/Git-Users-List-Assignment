import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
type UserDetailsProps = {
  loginName: string;
};
export const UserDetails: React.FC<UserDetailsProps> = ({ loginName }) => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  async function fetchUserDetails(username: string) {
    await fetch(`https://api.github.com/users/${username}`)
      .then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data }))
      )
      .then((obj) => {
        console.log(obj.body);
        setUserDetails(obj.body);
      });
  }
  useEffect(() => {
    if (loginName) {
      fetchUserDetails(loginName);
    }
  }, [loginName]);

  if (!loginName) {
    return <Typography variant="h4">Please select user</Typography>;
  } else if (fetching) {
    return <Typography variant="h4">Fetching user details </Typography>;
  }

  return (
    <Grid container>
      <Grid item md={12}>
        <img src={userDetails?.avatar_url} width={200} height={200} />
      </Grid>
      <Grid item md={6}>
        Name
      </Grid>
      <Grid item md={6}>
        <a href={userDetails?.html_url} target="_blank">
          {userDetails?.name}
        </a>
      </Grid>
      <Grid item md={6}>
        Member Since
      </Grid>
      <Grid item md={6}>
        {userDetails?.created_at}
      </Grid>
      <Grid item md={6}>
        Location
      </Grid>
      <Grid item md={6}>
        {userDetails?.location}
      </Grid>
      <Grid item md={6}>
        Followers
      </Grid>
      <Grid item md={6}>
        {userDetails?.followers}
      </Grid>
      <Grid item md={6}>
        Following
      </Grid>
      <Grid item md={6}>
        {userDetails?.following}
      </Grid>
      <Grid item md={6}>
        Public Repos
      </Grid>
      <Grid item md={6}>
        <a href={userDetails?.repos_url} target="_blank">
          {userDetails?.public_repos}
        </a>
      </Grid>
      <Grid item md={6}>
        Company
      </Grid>
      <Grid item md={6}>
        {userDetails?.company}
      </Grid>
    </Grid>
  );
};
