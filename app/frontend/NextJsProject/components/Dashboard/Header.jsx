import React from 'react'
import Head from "next/head";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";

const GET_ARGOCD_DATA_QUERY = gql`
  query GetJob($id: ID!) {
    job(id: $id) {
      items {
        spec {
          source {
            targetRevision
          }
        }
      }
    }
  }
`;


const Header = () => {
  const { loading, error, data } = useQuery(GET_ARGOCD_DATA_QUERY, {
    client,
    variables: { "id": "6447cdc747ea2c74be345313" },
  });

  const [argoData, setArgoData] = useState(null);

useEffect(() => {
  if (data) {
    console.log(JSON.stringify(data))
    setArgoData(data);
  }
}, [data]);

// Now you can access `argoData` which will be null initially and will be updated with the actual `data` once it's available.

if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>Error: {error.message}</p>;
}

if (!argoData) {
  return null;
}

  return (
    <div className='flex justify-between px-4 pt-4'>
        <h1>  ArgoCD Dashboard</h1>
        {/* <h1>Argo CD Data: {argoData.job.items[0].spec.source.targetRevision}</h1> */}
        <h1>Welcome Back</h1>
    </div>
  )
}

export default Header